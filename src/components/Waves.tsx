import { useTheme } from "@mui/material";

const Waves = () => {
  const theme = useTheme();

  theme.palette.primary.main;

  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="wave"
      style={{
        transform: "rotate(0deg)",
        transition: "0.3s",
      }}
      viewBox="0 0 1440 490"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color={theme.palette.background.default} offset="0%" />
          <stop stop-color={theme.palette.primary.main} offset="100%" />
        </linearGradient>
      </defs>
      <path
        style={{
          transform: "translate(0, 0px)",
          opacity: " 1",
        }}
        fill="url(#sw-gradient-0)"
        d="M0,0L21.8,16.3C43.6,33,87,65,131,89.8C174.5,114,218,131,262,147C305.5,163,349,180,393,163.3C436.4,147,480,98,524,98C567.3,98,611,147,655,204.2C698.2,261,742,327,785,343C829.1,359,873,327,916,310.3C960,294,1004,294,1047,318.5C1090.9,343,1135,392,1178,400.2C1221.8,408,1265,376,1309,334.8C1352.7,294,1396,245,1440,253.2C1483.6,261,1527,327,1571,351.2C1614.5,376,1658,359,1702,294C1745.5,229,1789,114,1833,65.3C1876.4,16,1920,33,1964,57.2C2007.3,82,2051,114,2095,155.2C2138.2,196,2182,245,2225,269.5C2269.1,294,2313,294,2356,318.5C2400,343,2444,392,2487,343C2530.9,294,2575,147,2618,114.3C2661.8,82,2705,163,2749,236.8C2792.7,310,2836,376,2880,334.8C2923.6,294,2967,147,3011,138.8C3054.5,131,3098,261,3120,326.7L3141.8,392L3141.8,490L3120,490C3098.2,490,3055,490,3011,490C2967.3,490,2924,490,2880,490C2836.4,490,2793,490,2749,490C2705.5,490,2662,490,2618,490C2574.5,490,2531,490,2487,490C2443.6,490,2400,490,2356,490C2312.7,490,2269,490,2225,490C2181.8,490,2138,490,2095,490C2050.9,490,2007,490,1964,490C1920,490,1876,490,1833,490C1789.1,490,1745,490,1702,490C1658.2,490,1615,490,1571,490C1527.3,490,1484,490,1440,490C1396.4,490,1353,490,1309,490C1265.5,490,1222,490,1178,490C1134.5,490,1091,490,1047,490C1003.6,490,960,490,916,490C872.7,490,829,490,785,490C741.8,490,698,490,655,490C610.9,490,567,490,524,490C480,490,436,490,393,490C349.1,490,305,490,262,490C218.2,490,175,490,131,490C87.3,490,44,490,22,490L0,490Z"
      />{" "}
    </svg>
  );
};

export default Waves;