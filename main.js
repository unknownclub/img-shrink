const { app, BrowserWindow, Menu } = require("electron");

// set env
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isWin32 = process.platform === "win32" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev ? true : false,
  });

  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("ready", () => {
    mainWindow = null;
  });
});

const menu = [
  ...(!isWin32
    ? [
        {
          role: "appMenu",
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ],
  },
];

// if (isWin32) {
//   menu.unshift({
//     role: "appMenu",
//   });
// }

app.on("window-all-closed", () => {
  if (isWin32) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
