using Microsoft.Win32;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.IO;
using MG_Admin_GUI.ViewModels;
using MG_Admin_GUI.Models;
using Org.BouncyCastle.Ocsp;
using System.Xml.Linq;
using System.Security.Cryptography;

namespace MG_Admin_GUI
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        #region Define Variables

        public PurchaseViewModel PurchaseVM { get; set; }
        public ReservationViewModel ReservationVM { get; set; }
        public ProductViewModel ProductVM { get; set; }
        public IngredientViewModel IngredientVM { get; set; }
        public CategoryViewModel CategoryVM { get; set; }
        public AllergenViewModel AllergenVM { get; set; }
        public DeskViewModel DeskVM { get; set; }
        public UserViewModel UserVM { get; set; }
        public EventLogViewModel EventLogVM { get; set; }
        //private DataUpdater dataUpdater;
        private string openedFilePath;
        private bool isImageModified = false;
        //private FileStream fileStream;
        string connectionString;

        string imageFolderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Images");
        //string imageFolderPath = ConfigurationManager.AppSettings["ImageFolderPath"];

        //OpenFileDialog openFileDialog = new OpenFileDialog();
        #endregion


        public MainWindow()
        {
            InitializeComponent();

            PurchaseVM = new PurchaseViewModel();
            ReservationVM = new ReservationViewModel();
            ProductVM = new ProductViewModel();
            IngredientVM = new IngredientViewModel();
            CategoryVM = new CategoryViewModel();
            AllergenVM = new AllergenViewModel();
            DeskVM = new DeskViewModel();
            UserVM = new UserViewModel();
            EventLogVM = new EventLogViewModel();

            //dataUpdater = new DataUpdater();
            //dataUpdater.DataUpdated += DataUpdater_DataUpdated;
            //dataUpdater.StartTimer();

            RefreshData();
            SetDatacontexts();
            RefreshListViews();
        }

        private void DataUpdater_DataUpdated(object sender, EventArgs e)
        {
            Dispatcher.Invoke(() => RefreshData());
        }

        public void SetDatacontexts()
        {
            cobCategories.ItemsSource = CategoryVM.Categories;
            cobIngredientAllergen.ItemsSource = AllergenVM.Allergens;
            cobProductIngredients.ItemsSource = IngredientVM.Ingredients;
            cobReservationDesks.ItemsSource = DeskVM.Desks;

            tabControl.DataContext = PurchaseVM;
            tabReservation.DataContext = ReservationVM;
            tabProduct.DataContext = ProductVM;
            grdIngredients.DataContext = IngredientVM;
            grdCategories.DataContext = CategoryVM;
            grdAllergens.DataContext = AllergenVM;
            grdDesks.DataContext = DeskVM;
            tabUser.DataContext = UserVM;
            tabEventLog.DataContext = EventLogVM;
        }

        public void RefreshData()
        {
            //GetConnection();
            GetAllAllergen();
            GetAllIngredient();
            GetAllCategory();
            GetAllProduct();
            GetAllUser();
            GetAllDesk();
            GetAllPurchase();
            GetAllReservation();
            GetAllEvents();
        }

        private void RefreshListViews()
        {
            dgPurchases.ItemsSource = PurchaseVM.Purchases.Where(purchase => purchase.status == OrderStatus.served && purchase.paid == true).ToList();
            lvPurchased.ItemsSource = PurchaseVM.Purchases.Where(purchase => purchase.status == OrderStatus.ordered).ToList();
            lvCooked.ItemsSource = PurchaseVM.Purchases.Where(purchase => purchase.status == OrderStatus.cooked).ToList();
            lvServed.ItemsSource = PurchaseVM.Purchases.Where(purchase => purchase.status == OrderStatus.served && purchase.paid == false).ToList();
        }

        public MySqlConnection GetConnection()
        {
            MySqlConnection connection = null;
            try
            {
                connectionString = $"Server={AppConfig.DbServer};Database={AppConfig.DbName};User Id={AppConfig.DbUser};Password={AppConfig.DbPassword};";
                connection = new MySqlConnection(connectionString);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nem sikerült kapcsolódni az adatbázishoz!" + ex.Message, "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            return connection;
        }

        #region Purchases
        public ObservableCollection<Purchase> GetAllPurchase()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from purchase";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        PurchaseVM.Purchases.Clear();
                        while (reader.Read())
                        {
                            Purchase purchase = new Purchase
                            {
                                id = reader.GetInt32("id"),
                                date = reader.GetDateTime("date"),
                                totalPay = reader.GetInt32("totalPay"),
                                paid = reader.GetBoolean("paid"),
                                userId = reader.GetInt32("userId"),
                                deskId = reader.GetInt32("deskId"),
                            };

                            if (Enum.TryParse(reader.GetString("status"), out OrderStatus status))
                            {
                                purchase.status = status;
                            }
                            else
                            {
                                purchase.status = OrderStatus.ordered; // vagy más alapértelmezett érték
                            }
                            purchase.purchasedProducts = GetPurchasedProducts(purchase.id);

                            PurchaseVM.Purchases.Add(purchase);
                        }
                    }
                }
            }
            return PurchaseVM.Purchases;
        }

        private List<KeyValuePair<Product, int>> GetPurchasedProducts(int purchaseId)
        {
            List<KeyValuePair<Product, int>> purchaseProducts = new List<KeyValuePair<Product, int>>();

            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string productQuery = "SELECT product.*, product_purchase.quantity AS purchaseQuantity FROM product INNER JOIN product_purchase ON product.id = product_purchase.productId WHERE product_purchase.purchaseId = @purchaseId";
                using (MySqlCommand productCommand = new MySqlCommand(productQuery, connection))
                {
                    productCommand.Parameters.AddWithValue("@purchaseId", purchaseId);

                    using (MySqlDataReader productReader = productCommand.ExecuteReader())
                    {
                        purchaseProducts.Clear();
                        while (productReader.Read())
                        {
                            Product product = new Product(imageFolderPath)
                            {
                                id = productReader.GetInt32("id"),
                                name = productReader.GetString("name"),
                                description = productReader.GetString("description"),
                                category = GetCategoryById(productReader.GetInt32("categoryId")),
                                quantity = productReader.GetString("quantity"),
                                price = productReader.GetInt32("price"),
                                isFood = productReader.GetBoolean("isFood"),
                                image = productReader.GetString("image")
                            };

                            int quantity = productReader.GetInt32("purchaseQuantity");
                            purchaseProducts.Add(new KeyValuePair<Product, int>(product, quantity));
                        }
                    }
                }
            }
            return purchaseProducts;
        }

        private void btnOrderedToCooked_Click(object sender, RoutedEventArgs e)
        {
            if (lvPurchased.SelectedItem != null)
            {
                Purchase selectedPurchase = (Purchase)lvPurchased.SelectedItem;
                selectedPurchase.status = OrderStatus.cooked;
                UpdatePurchaseStatus(selectedPurchase.id, OrderStatus.cooked);
                RefreshListViews();
            }
        }
        
        private void btnCookedToServed_Click(object sender, RoutedEventArgs e)
        {
            if (lvCooked.SelectedItem != null)
            {
                Purchase selectedPurchase = (Purchase)lvCooked.SelectedItem;

                selectedPurchase.status = OrderStatus.served;

                UpdatePurchaseStatus(selectedPurchase.id, OrderStatus.served);

                RefreshListViews();
            }

        }

        private void UpdatePurchaseStatus(int purchaseId, OrderStatus newStatus)
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "UPDATE purchase SET status = @status WHERE id = @id";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@status", newStatus.ToString());
                    command.Parameters.AddWithValue("@id", purchaseId);
                    command.ExecuteNonQuery();
                }
            }
        }
        private void chkPurchased_Checked(object sender, RoutedEventArgs e)
        {
            var checkBox = (CheckBox)sender;
            var purchase = (Purchase)checkBox.DataContext;

            purchase.paid = true;

            UpdatePaidStatus(purchase, true);
        }

        private void chkPurchased_Unchecked(object sender, RoutedEventArgs e)
        {
            var checkBox = (CheckBox)sender;
            var purchase = (Purchase)checkBox.DataContext;

            purchase.paid = false;

            UpdatePaidStatus(purchase, false);
        }

        private void UpdatePaidStatus(Purchase purchase, bool isPaid)
        {
            int id = purchase.id;
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "UPDATE purchase SET paid = @isPaid WHERE id = @id";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ispaid", isPaid);
                    command.Parameters.AddWithValue("@id", id);
                    command.ExecuteNonQuery();
                }
            }
            RefreshListViews();
        }

        #endregion

        #region Reservations
        public ObservableCollection<Reservation> GetAllReservation()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from reservation";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        ReservationVM.Reservations.Clear();
                        while (reader.Read())
                        {
                            Reservation reservation= new Reservation()
                            {
                                id = reader.GetInt32("id"),
                                numberOfGuests = reader.GetInt32("numberOfGuests"),
                                arrivalTime = reader.GetDateTime("arrivalTime"),
                                getawayTime = reader.GetDateTime("getawayTime"),
                                name = reader.GetString("name"),
                                phone = reader.GetString("phone"),
                                deskId = GetDeskById(reader.GetInt32("deskId"))
                            };

                            ReservationVM.Reservations.Add(reservation);
                        }
                    }
                }
            }
            return ReservationVM.Reservations;
        }

        public Desk GetDeskById(int deskId)
        {
            return DeskVM.Desks.FirstOrDefault(desk => desk.id == deskId);
        }

        private void dgReservations_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgReservations.SelectedItem  != null)
            {
                ReservationVM.selectedReservation = (Reservation)dgReservations.SelectedItem;
                cobReservationDesks.SelectedIndex = dgReservations.SelectedIndex;
            }
        }

        #endregion

        #region Products

        public ObservableCollection<Product> GetAllProduct()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from product";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        ProductVM.Products.Clear();
                        while (reader.Read())
                        {
                            Product product = new Product(imageFolderPath)
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                                description = reader.GetString("description"),
                                category = GetCategoryById(reader.GetInt32("categoryId")),
                                quantity = reader.GetString("quantity"),
                                price = reader.GetInt32("price"),
                                isFood = reader.GetBoolean("isFood"),
                                image = reader.GetString("image")
                            };
                            product.ingredients = GetIngredientsForProduct(product.id);
                            ProductVM.Products.Add(product);
                        }
                    }
                }
            }
            return ProductVM.Products;
        }

        public ObservableCollection<Ingredient> GetIngredientsForProduct(int productId)
        {
            ObservableCollection<Ingredient> ingredients = new ObservableCollection<Ingredient>();

            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT i.* FROM ingredient i " +
                               "JOIN product_ingredient pi ON i.id = pi.ingredientId " +
                               "WHERE pi.productId = @productId";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@productId", productId);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Ingredient ingredient = new Ingredient()
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                            };

                            ingredients.Add(ingredient);
                        }
                    }
                }
            }
            return ingredients;
        }

        public Category GetCategoryById(int categoryId)
        {
            return CategoryVM.Categories.FirstOrDefault(category => category.id == categoryId);
        }

        private void dgProducts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgProducts.SelectedItem != null)
            {
                ProductVM.selectedProduct = (Product)dgProducts.SelectedItem;
                string newImagePath = ProductVM.selectedProduct.FullImagePath;

                //imgProductImage.Source = new BitmapImage(new Uri(newImagePath));
                cobCategories.SelectedItem = ProductVM.selectedProduct.category;
            }
        }

        private void btnAddIngredient_Click(object sender, RoutedEventArgs e)
        {
            lvProductIngredient.ItemsSource = null;
            lvProductIngredient.Items.Add(cobProductIngredients.SelectedItem);
        }


        private void btnImageOpen_Click(object sender, RoutedEventArgs e)
        {
            //openFileDialog.Filter = "Képfájlok|*.jpg;*.png;*.jpeg|Mindennemű fájl|*.*";

            //if (openFileDialog.ShowDialog() == true)
            //{
            //    imgProductImage.Source = new BitmapImage(new Uri(openFileDialog.FileName));

            //    tbProductImage.Text = Path.GetFileName(openFileDialog.FileName);
            //    openedFilePath = openFileDialog.FileName;
            //}
            try
            {   
                OpenFileDialog openFileDialog = new OpenFileDialog();
                openFileDialog.Filter = "Képfájlok (*.jpg;*.jpeg;*.png)|*.jpg;*.jpeg;*.png";

                if (openFileDialog.ShowDialog() == true)
                {

                    using (FileStream stream = File.OpenWrite(openFileDialog.FileName))
                    {
                        byte[] imageData = new byte[stream.Length];
                        stream.Read(imageData, 0, imageData.Length);
                        imgProductImage.Source = new BitmapImage(new Uri(openFileDialog.FileName));
                        tbProductImage.Text = Path.GetFileName(openFileDialog.FileName);
                        openedFilePath = openFileDialog.FileName;
                        isImageModified = true;

                        stream.Close();
                    }
                }

                //OpenFileDialog openFileDialog = new OpenFileDialog();
                //openFileDialog.Filter = "Képfájlok (*.jpg;*.jpeg;*.png)|*.jpg;*.jpeg;*.png";

                //if (openFileDialog.ShowDialog() == true)
                //{
                //    Stream stream = File.OpenRead(openFileDialog.FileName);

                //    byte[] imageData = new byte[stream.Length];
                //    stream.Read(imageData, 0, imageData.Length);
                //    imgProductImage.Source = new BitmapImage(new Uri(openFileDialog.FileName));
                //    tbProductImage.Text = Path.GetFileName(openFileDialog.FileName);
                //    openedFilePath = openFileDialog.FileName;

                //    stream.Close();
                //}
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a fájl megnyitása közben: {ex.Message}");
            }
        }

        #endregion

        #region AKHA
        public ObservableCollection<Ingredient> GetAllIngredient()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from ingredient";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        IngredientVM.Ingredients.Clear();
                        while (reader.Read())
                        {
                            Ingredient ingredient = new Ingredient()
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                                inStock = reader.GetDecimal("inStock"),
                                qUnit = reader.GetString("qUnit")
                            };
                            ingredient.ingredientAllergens = GetAllergensForIngredient(ingredient.id);
                            IngredientVM.Ingredients.Add(ingredient);
                        }
                    }
                }
            }
            return IngredientVM.Ingredients;
        }

        public ObservableCollection<Allergen> GetAllergensForIngredient(int ingredientId)
        {
            ObservableCollection<Allergen> ingredientAllergens = new ObservableCollection<Allergen>();

            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * FROM allergen JOIN ingredient_allergen ON allergen.id = ingredient_allergen.allergenId WHERE ingredient_allergen.ingredientId = @ingredientId";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ingredientId", ingredientId);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Allergen allergen = new Allergen()
                            {
                                id = reader.GetInt32("id"),
                                code = reader.GetDecimal("code"),
                                name = reader.GetString("name")
                            };

                            ingredientAllergens.Add(allergen);
                        }
                    }
                }
            }
            return ingredientAllergens;
        }

        private void btnAddAllergen_Click(object sender, RoutedEventArgs e)
        {
            lvIngredientAllergens.ItemsSource = null;
            lvIngredientAllergens.Items.Add(cobIngredientAllergen.SelectedItem);
        }


        public ObservableCollection<Category> GetAllCategory()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from category";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        CategoryVM.Categories.Clear();
                        while (reader.Read())
                        {
                            Category category = new Category()
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                            };
                            CategoryVM.Categories.Add(category);
                        }
                    }
                }
            }
            return CategoryVM.Categories;
        }


        public ObservableCollection<Allergen> GetAllAllergen()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from allergen";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        AllergenVM.Allergens.Clear();
                        while (reader.Read())
                        {
                            Allergen allergen = new Allergen()
                            {
                                id = reader.GetInt32("id"),
                                code = reader.GetDecimal("code"),
                                name = reader.GetString("name")
                            };

                            AllergenVM.Allergens.Add(allergen);
                        }
                    }
                }
            }
            return AllergenVM.Allergens;
        }

        public ObservableCollection<Desk> GetAllDesk()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from desk";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        DeskVM.Desks.Clear();
                        while (reader.Read())
                        {
                            Desk desk = new Desk()
                            {
                                id = reader.GetInt32("id"),
                                numberOfSeats = reader.GetInt32("numberOfSeats")
                            };

                            DeskVM.Desks.Add(desk);
                        }
                    }
                }
            }
            return DeskVM.Desks;
        }

        private void dgIngredients_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgIngredients.SelectedItem != null)
            {
                IngredientVM.selectedIngredient = (Ingredient)dgIngredients.SelectedItem;
            }
        }

        private void dgCategories_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgCategories.SelectedItem != null)
            {
                CategoryVM.selectedCategory = (Category)dgCategories.SelectedItem;
            }
        }

        private void dgAllergens_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgAllergens.SelectedItem != null)
            {
                AllergenVM.selectedAllergen = (Allergen)dgAllergens.SelectedItem;
            }
        }

        private void dgDesks_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgDesks.SelectedItem != null)
            {
                DeskVM.selectedDesk = (Desk)dgDesks.SelectedItem;
            }
        }

        #endregion

        #region Users
        public ObservableCollection<User> GetAllUser()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from user";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        UserVM.Users.Clear();
                        while (reader.Read())
                        {
                            User user = new User()
                            {
                                id = reader.GetInt32("id"),
                                name = reader.GetString("name"),
                                email = reader.GetString("email"),
                                password = reader.GetString("password"),
                                phone = reader.GetString("phone"),
                                admin = reader.GetBoolean("admin")
                            };

                            UserVM.Users.Add(user);
                        }
                    }
                }
            }
            return UserVM.Users;
        }

        private void dgUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgUsers.SelectedItem != null)
            {
                UserVM.selectedUser = (User)dgUsers.SelectedItem;
            }

        }


        #endregion

        #region EventLog
        public ObservableCollection<EventLog> GetAllEvents()
        {
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                string query = "SELECT * from eventlog";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        EventLogVM.EventLogs.Clear();
                        while (reader.Read())
                        {
                            EventLog eventlog= new EventLog()
                            {
                                id = reader.GetInt32("id"),
                                eventType = reader.GetString("eventType"),
                                affectedTable = reader.GetString("affectedTable"),
                                affectedId = reader.GetInt32("affectedId"),
                                eventDescription = reader.GetString("event"),
                                date = reader.GetDateTime("date"),
                                userId = GetUserById(reader.GetInt32("userId"))
                            };

                            EventLogVM.EventLogs.Add(eventlog);
                        }
                    }
                }
            }
            return EventLogVM.EventLogs;
        }

        public User GetUserById(int userId)
        {
            return UserVM.Users.FirstOrDefault(user => user.id == userId);
        }



        private void dgEventLogs_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dgEventLogs.SelectedItem != null)
            {
                EventLogVM.selectedEvent = (EventLog)dgEventLogs.SelectedItem;
            }
        }


        #endregion

        private void btnDataSave_Click(object sender, RoutedEventArgs e)
        {
            Button clickedButton = sender as Button;

            if (clickedButton != null)
            {
                string buttonName = clickedButton.Name;
                string saveQuery = null;
                string tableName = null;
                string tableName2 = null;
                Dictionary<string, object> parameters = new Dictionary<string, object>();


                try
                {
                    switch (buttonName)
                    {
                        case "btnReservationSave":
                            tableName = "reservation";
                            saveQuery = $"INSERT INTO {tableName}(id, numberOfGuests, arrivalTime, getawayTime, name, phone, deskId) VALUES(@id, @numberOfGuests, @arrivalTime, @getawayTime, @name, @phone, @deskId)";

                            parameters.Add("@id", int.Parse(tbReservationId.Text));
                            parameters.Add("@numberOfGuests", int.Parse(tbReservationGuestNo.Text));
                            parameters.Add("@arrivalTime", DateTime.Parse(dtpReservationArrivalTime.Text));
                            parameters.Add("@getawayTime", DateTime.Parse(dtpReservationGetawayTime.Text));
                            parameters.Add("@name", tbReservationName.Text);
                            parameters.Add("@phone", tbReservationPhone.Text);
                            parameters.Add("@deskId", cobReservationDesks.SelectedValue);
                            break;

                        case "btnProductSave":
                            tableName = "product";
                            tableName2 = "product_ingredient";
                            saveQuery = $"INSERT INTO {tableName} (id, name, description, categoryId, quantity, price, isFood, image) VALUES (@id, @name, @description, @categoryId, @quantity, @price, @isFood, @image);";

                            parameters.Add("@id", int.Parse(tbProductId.Text));
                            parameters.Add("@name", tbProductName.Text);
                            parameters.Add("@description", tbProductDescription.Text);
                            parameters.Add("@categoryId", cobCategories.SelectedValue);
                            parameters.Add("@quantity", tbProductQuantity.Text);
                            parameters.Add("@price", int.Parse(tbProductPrice.Text));
                            parameters.Add("@isFood", cbProductIsFood.IsChecked.HasValue && cbProductIsFood.IsChecked.Value);
                            parameters.Add("@image", tbProductImage.Text);

                            List<string> ingredientInsertCommands = new List<string>();
                            foreach (var ingredient in lvProductIngredient.Items)
                            {
                                int ingredientId = ((Ingredient)ingredient).id;
                                string ingredientInsertCommand = $"INSERT INTO {tableName2} (productId, ingredientId) VALUES (@id, {ingredientId});";
                                ingredientInsertCommands.Add(ingredientInsertCommand);
                            }

                            saveQuery += string.Join("", ingredientInsertCommands);

                            string destinationPath = Path.Combine(imageFolderPath, tbProductImage.Text);
                            File.Copy(openedFilePath, destinationPath, true);
                            break;

                        case "btnIngredientSave":
                            tableName = "ingredient";
                            tableName2 = "ingredient_allergen";
                            saveQuery = $"INSERT INTO {tableName} (id, name, inStock, qUnit) VALUES (@id, @name, @inStock, @qUnit);";

                            parameters.Add("@id", int.Parse(tbIngredientId.Text));
                            parameters.Add("@name", tbIngredientName.Text);
                            parameters.Add("@inStock", decimal.Parse(tbIngredientInStock.Text.Replace('.', ',')));
                            parameters.Add("@qUnit", tbIngredientQUnit.Text);

                            List<string> allergenInsertCommands = new List<string>();
                            foreach (var allergen in lvIngredientAllergens.Items)
                            {
                                int allergenId = ((Allergen)allergen).id;
                                string allergenInsertCommand = $"INSERT INTO {tableName2} (ingredientId, allergenId) VALUES (@id, {allergenId});";
                                allergenInsertCommands.Add(allergenInsertCommand);
                            }

                            saveQuery += string.Join("", allergenInsertCommands);

                            break;

                        case "btnCategorySave":
                            tableName = "category";
                            saveQuery = $"INSERT INTO {tableName} (id, name) VALUES (@id, @name)";

                            parameters.Add("@id", int.Parse(tbCategoryId.Text));
                            parameters.Add("@name", tbCategoryName.Text);
                            break;

                        case "btnAllergenSave":
                            tableName = "allergen";
                            saveQuery = $"INSERT INTO {tableName} (id, code, name) VALUES (@id, @code, @name)";

                            parameters.Add("@id", int.Parse(tbAllergenId.Text));
                            parameters.Add("@code", decimal.Parse(tbAllergenCode.Text.Replace('.', ',')));
                            parameters.Add("@name", tbAllergenName.Text);
                            break;

                        case "btnDeskSave":
                            tableName = "desk";
                            saveQuery = $"INSERT INTO {tableName} (id, numberOfSeats) VALUES (@id, @numberOfSeats)";

                            parameters.Add("@id", int.Parse(tbDeskId.Text));
                            parameters.Add("@numberOfSeats", int.Parse(tbDeskNumberOfSeats.Text));
                            break;

                        case "btnUserSave":
                            tableName = "user";
                            saveQuery = $"INSERT INTO {tableName} (id, name, email, password, phone, admin) VALUES (@id, @name, @email, @password, @phone, @admin)";

                            parameters.Add("@id", int.Parse(tbUserId.Text));
                            parameters.Add("@name", tbUserName.Text);
                            parameters.Add("@email", tbUserEmail.Text);
                            parameters.Add("@password", tbUserPassword.Text);
                            parameters.Add("@phone", tbUserPhone.Text);
                            parameters.Add("@admin", cbUserAdmin.IsChecked.HasValue && cbUserAdmin.IsChecked.Value);
                            break;

                        default:
                            // Alapértelmezett eset
                            break;
                    }
                    ExecuteQuery(saveQuery, parameters);
                    ClearPropertyFields();
                    ClearSelectedItems();
                    RefreshData();
                }


                catch (Exception ex)
                {
                    MessageBox.Show(string.Format("Hiba történt az új adat felvitelekor a {0} táblába! {1}", tableName, ex.Message), "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

        }

        private void btnDataUpdate_Click(object sender, RoutedEventArgs e)
        {
            Button clickedButton = sender as Button;

            if (clickedButton != null)
            {
                string buttonName = clickedButton.Name;
                string updateQuery = null;
                string tableName = null;
                string tableName2 = null;
                string deleteQuery = null;
                Dictionary<string, object> parameters = new Dictionary<string, object>();


                try
                {
                    switch (buttonName)
                    {
                        case "btnReservationUpdate":
                            tableName = "reservation";
                            updateQuery = $"UPDATE {tableName} SET id = @id, numberOfGuests = @numberOfGuests, arrivalTime = @arrivalTime, getawayTime = @getawayTime, name = @name, phone = @phone, deskId = @deskId WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbReservationId.Text));
                            parameters.Add("@numberOfGuests", int.Parse(tbReservationGuestNo.Text));
                            parameters.Add("@arrivalTime", DateTime.Parse(dtpReservationArrivalTime.Text));
                            parameters.Add("@getawayTime", DateTime.Parse(dtpReservationGetawayTime.Text));
                            parameters.Add("@name", tbReservationName.Text);
                            parameters.Add("@phone", tbReservationPhone.Text);
                            parameters.Add("@deskId", cobReservationDesks.SelectedValue);
                            break;

                        case "btnProductUpdate":
                            tableName = "product";
                            tableName2 = "product_ingredient";
                            updateQuery = $"UPDATE {tableName} SET name = @name, description = @description, categoryId = @categoryId, quantity = @quantity, price = @price, isFood = @isFood, image = @image WHERE id = @id;";

                            parameters.Add("@id", int.Parse(tbProductId.Text));
                            parameters.Add("@name", tbProductName.Text);
                            parameters.Add("@description", tbProductDescription.Text);
                            parameters.Add("@categoryId", cobCategories.SelectedValue);
                            parameters.Add("@quantity", tbProductQuantity.Text);
                            parameters.Add("@price", int.Parse(tbProductPrice.Text));
                            parameters.Add("@isFood", cbProductIsFood.IsChecked.HasValue && cbProductIsFood.IsChecked.Value);
                            parameters.Add("@image", tbProductImage.Text);

                            deleteQuery = $"DELETE FROM {tableName2} WHERE productId = @id";
                            using (MySqlConnection connection = new MySqlConnection(connectionString))
                            {
                                connection.Open();

                                using (MySqlCommand command = new MySqlCommand(deleteQuery, connection))
                                {
                                    command.Parameters.AddWithValue("@id", int.Parse(tbProductId.Text));
                                    command.ExecuteNonQuery();
                                }

                                connection.Close();
                            }

                            List<string> ingredientInsertCommands = new List<string>();
                            foreach (var ingredient in lvProductIngredient.Items)
                            {
                                int ingredientId = ((Ingredient)ingredient).id;
                                string ingredientInsertCommand = $"INSERT INTO {tableName2} (productId, ingredientId) VALUES (@id, {ingredientId});";
                                ingredientInsertCommands.Add(ingredientInsertCommand);
                            }

                            updateQuery += string.Join("", ingredientInsertCommands);

                            if (isImageModified)
                            {
                                string destinationPath = Path.Combine(imageFolderPath, tbProductImage.Text);
                                File.Copy(openedFilePath, destinationPath, true);
                            }
                            break;

                        case "btnIngredientUpdate":
                            tableName = "ingredient";
                            tableName2 = "ingredient_allergen";
                            updateQuery = $"UPDATE {tableName} SET name = @name, inStock = @inStock, qUnit = @qUnit WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbIngredientId.Text));
                            parameters.Add("@name", tbIngredientName.Text);
                            parameters.Add("@inStock", decimal.Parse(tbIngredientInStock.Text.Replace('.', ',')));
                            parameters.Add("@qUnit", tbIngredientQUnit.Text);

                            deleteQuery = $"DELETE FROM {tableName2} WHERE ingredientId = @id";
                            using (MySqlConnection connection = new MySqlConnection(connectionString))
                            {
                                connection.Open();

                                using (MySqlCommand command = new MySqlCommand(deleteQuery, connection))
                                {
                                    command.Parameters.AddWithValue("@id", int.Parse(tbIngredientId.Text));
                                    command.ExecuteNonQuery();
                                }

                                connection.Close();
                            }

                            List<string> allergenInsertCommands = new List<string>();
                            foreach (var allergen in lvIngredientAllergens.Items)
                            {
                                int allergenId = ((Allergen)allergen).id;
                                string allergenInsertCommand = $"INSERT INTO {tableName2} (ingredientId, allergenId) VALUES (@id, {allergenId});";
                                allergenInsertCommands.Add(allergenInsertCommand);
                            }

                            updateQuery += string.Join("", allergenInsertCommands);

                            break;

                        case "btnCategoryUpdate":
                            tableName = "category";
                            updateQuery = $"UPDATE {tableName} SET name = @name WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbCategoryId.Text));
                            parameters.Add("@name", tbCategoryName.Text);
                            break;

                        case "btnAllergenUpdate":
                            tableName = "allergen";
                            updateQuery = $"UPDATE {tableName} SET code = @code, name = @name WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbAllergenId.Text));
                            parameters.Add("@code", decimal.Parse(tbAllergenCode.Text.Replace('.', ',')));
                            parameters.Add("@name", tbAllergenName.Text);
                            break;

                        case "btnDeskUpdate":
                            tableName = "desk";
                            updateQuery = $"UPDATE {tableName} SET numberOfSeats = @numberOfSeats WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbDeskId.Text));
                            parameters.Add("@numberOfSeats", int.Parse(tbDeskNumberOfSeats.Text));
                            break;

                        case "btnUserUpdate":
                            tableName = "user";
                            updateQuery = $"UPDATE {tableName} SET name = @name, email = @email, password = @password, phone = @phone, admin = @admin WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbUserId.Text));
                            parameters.Add("@name", tbUserName.Text);
                            parameters.Add("@email", tbUserEmail.Text);
                            parameters.Add("@password", tbUserPassword.Text);
                            parameters.Add("@phone", tbUserPhone.Text);
                            parameters.Add("@admin", cbUserAdmin.IsChecked.HasValue && cbUserAdmin.IsChecked.Value);
                            break;

                        default:
                            // Alapértelmezett eset
                            break;
                    }
                    ExecuteQuery(updateQuery, parameters);
                    ClearPropertyFields();
                    ClearSelectedItems();
                    RefreshData();
                }


                catch (Exception ex)
                {
                    MessageBox.Show(string.Format("Hiba történt a {0} frissítésekor! {1}", tableName, ex.Message), "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private void btnDataDelete_Click(object sender, RoutedEventArgs e)
        {
            Button clickedButton = sender as Button;

            if (clickedButton != null)
            {
                string buttonName = clickedButton.Name;
                string deleteQuery = null;
                string tableName = null;
                string tableName2 = null;
                Dictionary<string, object> parameters = new Dictionary<string, object>();


                try
                {
                    switch (buttonName)
                    {
                        case "btnReservationDelete":
                            tableName = "reservation";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbReservationId.Text));

                            ClearSelectedItems();
                            break;

                        case "btnProductDelete":
                            tableName = "product";
                            tableName2 = "product_ingredient";
                            deleteQuery = $"DELETE FROM {tableName2} WHERE productId = @id";
                            deleteQuery += $"DELETE FROM {tableName} WHERE id = @id";
                            

                            parameters.Add("@id", int.Parse(tbProductId.Text));

                            try
                            {
                                int searchedId = int.Parse(tbProductId.Text);
                                //Product selectedProduct = ProductVM.Products.FirstOrDefault(p => p.id == searchedId);
                                //imgProductImage.Source = null;
                                //GC.Collect();
                                //GC.WaitForPendingFinalizers();
                                File.Delete(ProductVM.selectedProduct.FullImagePath);
                            }
                            catch (Exception ex)
                            {
                                MessageBox.Show(ex.Message);
                            }

                            ClearSelectedItems();
                            break;

                        case "btnIngredientDelete":
                            tableName = "ingredient";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbIngredientId.Text));

                            ClearSelectedItems();

                            break;

                        case "btnCategoryDelete":
                            tableName = "category";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbCategoryId.Text));

                            ClearSelectedItems();
                            break;

                        case "btnAllergenDelete":
                            tableName = "allergen";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbAllergenId.Text));

                            ClearSelectedItems();
                            break;

                        case "btnDeskDelete":
                            tableName = "desk";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbDeskId.Text));

                            ClearSelectedItems();
                            break;

                        case "btnUserDelete":
                            tableName = "user";
                            deleteQuery = $"DELETE FROM {tableName} WHERE id = @id";

                            parameters.Add("@id", int.Parse(tbUserId.Text));

                            ClearSelectedItems();
                            break;

                        default:
                            // Alapértelmezett eset
                            break;
                    }
                    ExecuteQuery(deleteQuery, parameters);
                    ClearPropertyFields();
                    RefreshData();
                }


                catch (Exception ex)
                {
                    MessageBox.Show(string.Format("Hiba történt a {0} frissítésekor! {1}", tableName, ex.Message), "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

        }

        public void ExecuteQuery(string query, Dictionary<string, object> parameters = null)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                MySqlTransaction transaction = connection.BeginTransaction();
                try
                {
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        if (parameters != null)
                        {
                            AddParametersToCommand(command, parameters);
                        }
                        command.ExecuteNonQuery();
                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt az adatbázisba írás során!" + ex.Message, "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                    transaction.Rollback();
                }
                finally
                {
                    connection.Close();
                }
            }
        }
        private void AddParametersToCommand(MySqlCommand command, Dictionary<string, object> parameters)
        {
            foreach (var parameter in parameters)
            {
                command.Parameters.AddWithValue(parameter.Key, parameter.Value);
            }
        }


        private void btnDataCancel_Click(object sender, RoutedEventArgs e)
        {
            ClearSelectedItems();

        }

        private void ClearPropertyFields()
        {
            tbReservationId.Text = string.Empty;
            tbReservationGuestNo.Text = string.Empty;
            dtpReservationArrivalTime.Text = string.Empty;
            dtpReservationGetawayTime.Text = string.Empty;
            
            //tbReservationArrivalTime.Text = string.Empty;
            //tbReservationGetawayTime.Text = string.Empty;
            dtpReservationArrivalTime.Value = DateTime.Now;
            dtpReservationGetawayTime.Value = DateTime.Now;
            tbReservationName.Text = string.Empty;
            tbReservationPhone.Text = string.Empty;
            cobReservationDesks.SelectedItem = null;

            tbProductId.Text = string.Empty;
            tbProductName.Text = string.Empty;
            cobCategories.SelectedIndex = -1;
            tbProductQuantity.Text = string.Empty;
            tbProductPrice.Text = string.Empty;
            cbProductIsFood.IsChecked = false;
            tbProductDescription.Text = string.Empty;
            //lvProductIngredient.Items.Clear();
            imgProductImage.Source = null;

            tbIngredientId.Text = string.Empty;
            tbIngredientName.Text = string.Empty;
            tbIngredientInStock.Text = string.Empty;
            tbIngredientQUnit.Text = string.Empty;

            tbCategoryId.Text = string.Empty;
            tbCategoryName.Text = string.Empty;

            tbAllergenId.Text = string.Empty;
            tbAllergenCode.Text = string.Empty;
            tbAllergenName.Text = string.Empty;

            tbDeskId.Text = string.Empty;
            tbDeskNumberOfSeats.Text = string.Empty;

            tbUserId.Text = string.Empty;
            tbUserName.Text = string.Empty;
            tbUserEmail.Text = string.Empty;
            tbUserPassword.Text = string.Empty;
            tbUserPhone.Text = string.Empty;
            cbUserAdmin.IsChecked = false;

            tbEventLogId.Text = string.Empty;
            tbEventLogEventType.Text = string.Empty;
            tbEventLogAffectedTable.Text = string.Empty;
            tbEventLogAffectedId.Text = string.Empty;
            tbEventLogEventDescription.Text = string.Empty;
            tbEventLogDate.Text = string.Empty;
        }

        private void ClearSelectedItems()
        {
            //dgProducts.SelectedIndex = -1;
            //tbProductId.Text = string.Empty;
            //tbProductName.Text = string.Empty;
            //tbProductDescription.Text = string.Empty;
            //cobCategories.SelectedIndex = -1;
            //tbProductQuantity.Text = string.Empty;
            //tbProductPrice.Text = string.Empty;
            //cbProductIsFood.IsChecked = false;
            //imgProductImage.Source = null;
            //tbProductImage.Text = string.Empty;

            ReservationVM.selectedReservation = null;
            ProductVM.selectedProduct = null;
            IngredientVM.selectedIngredient = null;
            CategoryVM.selectedCategory = null;
            AllergenVM.selectedAllergen = null;
            DeskVM.selectedDesk = null;
            UserVM.selectedUser = null;
            EventLogVM.selectedEvent = null;

        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

    }
}

