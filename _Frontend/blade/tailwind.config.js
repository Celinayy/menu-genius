/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.vue",
    ],
    theme: {
      extend: {

        // fenti sáv fentről való beúszása

        keyframes: {
            floating_from_top: {
              '0%': { transform: 'translateY(-100%)' },
              '100%':  { transform: 'translateY(0%)' }
            },

        // asztalfoglalásos content balról való beszúszása

            floating_from_left: {
                '0%': { transform: 'translateX(-100%)' },
                '100%':  { transform: 'translateY(0%)' }
              },

        // asztalfoglalásos content balról való beszúszása

              floating_from_right: {
                '0%': { transform: 'translateX(200%)' },
                '100%':  { transform: 'translateX(0%)' }
              },

              floating_from_top_menu: {
                '0%': { transform: 'scaleY(0%)' },
                '100%':  { transform: 'scaleY(100%)' }
              }
          },
      },

      animation: {
        floating_from_top: 'floating_from_top 0.5s ease-in-out',
        floating_from_left: 'floating_from_left 0.5s ease-in-out',
        floating_from_right: 'floating_from_right 0.5s ease-in-out',
        floating_from_top_menu: 'floating_from_top_menu 0.5s ease-in-out',
      }
    },

    plugins: []
}
