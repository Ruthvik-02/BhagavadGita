let playing = false;

let leftbutton = document.getElementById("left-btn");
let rightbutton = document.getElementById("right-btn");

let audio1 = document.getElementById("first-song");
let audio2 = document.getElementById("second-song");

let song = "";
let suriprise = "";

leftbutton.addEventListener("click", () => {
  if (leftbutton.classList.contains("fa-play")) {
    if (playing) {
      audio2.pause();
      rightbutton.classList.remove("fa-pause");
      rightbutton.classList.add("fa-play");
    }
    audio1.play();
    playing = true;
    song = "music1";
    leftbutton.classList.remove("fa-play");
    leftbutton.classList.add("fa-pause");
  } else {
    audio1.pause();

    playing = false;
    song = "";
    leftbutton.classList.remove("fa-pause");
    leftbutton.classList.add("fa-play");
  }
});

rightbutton.addEventListener("click", () => {
  if (rightbutton.classList.contains("fa-play")) {
    if (playing) {
      audio1.pause();
      leftbutton.classList.remove("fa-pause");
      leftbutton.classList.add("fa-play");
    }
    audio2.play();
    playing = true;
    song = "music2";
    rightbutton.classList.remove("fa-play");
    rightbutton.classList.add("fa-pause");
  } else {
    audio2.pause();
    playing = false;
    song = "";
    rightbutton.classList.remove("fa-pause");
    rightbutton.classList.add("fa-play");
  }
});

let quotations = [];
let pictures = [];

async function getQuotes() {
  let url = `https://ruthvik-02.github.io/Bhagavadgitadata/quotations.json`;
  let response = await fetch(url);
  let data = await response.json();
  quotations = data[0];
  pictures = data[1];
}

let nextButton = document.getElementById("btn-next");
let quoteImage = document.getElementById("quote-img");
let quote = document.getElementById("quote");

nextButton.addEventListener("click", changeQuote);

function changeQuote() {
  // linear-gradient(
  //   270deg,
  //   rgb(80, 101, 20),
  //   rgb(142, 241, 245),
  //   rgb(88, 54, 244)
  // );

  divToImg();
  let deg = Math.floor(Math.random() * 361);
  let color1 = generateColors();
  let color2 = generateColors();
  let color3 = generateColors();

  let value = `linear-gradient(${deg}deg,${color1},${color2},${color3})`;
  document.body.style.backgroundImage = value;

  let quoteIndex = Math.floor(Math.random() * quotations.length);
  quote.innerText = quotations[quoteIndex].quote;

  let picturesIndex = Math.floor(Math.random() * pictures.length);
  let imageSrc = pictures[picturesIndex].img;
  quoteImage.setAttribute("src", imageSrc);
}

function generateColors() {
  let colorHex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let color = "#";

  for (let index = 0; index < 6; index++) {
    let num = Math.floor(Math.random() * colorHex.length);
    color += colorHex[num];
  }

  return color;
}

quote.addEventListener("click", () => {
  let quoteText = quote.innerText;
  navigator.clipboard.writeText(quoteText);
});

let arrowKeys = [
  "Down",
  "Up",
  "Left",
  "Right",
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
];

let spaceBar = ["Space Bar", "Spacebar", " "];

let escapeKey = ["Esc", "Escape"];

document.addEventListener("keydown", (e) => {
  if (arrowKeys.includes(e.key)) {
    changeQuote();
  } else if (spaceBar.includes(e.key)) {
    if (!playing) {
      audio1.play();
      playing = true;
      song = "music1";
      leftbutton.classList.remove("fa-play");
      leftbutton.classList.add("fa-pause");
    } else {
      if (song == "music1") {
        audio1.pause();
        leftbutton.classList.remove("fa-pause");
        leftbutton.classList.add("fa-play");

        audio2.play();
        song = "music2";
        rightbutton.classList.remove("fa-play");
        rightbutton.classList.add("fa-pause");
      } else {
        audio2.pause();
        rightbutton.classList.remove("fa-pause");
        rightbutton.classList.add("fa-play");

        audio1.play();
        song = "music1";
        leftbutton.classList.remove("fa-play");
        leftbutton.classList.add("fa-pause");
      }
    }
  } else if (escapeKey.includes(e.key)) {
    if (playing) {
      if (song == "music1") {
        audio1.pause();
        playing = false;
        song = "";
        leftbutton.classList.remove("fa-pause");
        leftbutton.classList.add("fa-play");
      } else {
        audio2.pause();
        playing = false;
        song = "";
        rightbutton.classList.remove("fa-pause");
        rightbutton.classList.add("fa-play");
      }
    }
  } else if (e.key == "b" || e.key == "B") {
    suriprise += e.key;
  } else if (suriprise == "b" || suriprise == "B") {
    if (e.key == "g" || e.key == "G") {
      document.body.innerHTML = "";
      document.body.innerHTML = `
      // <div style="display:flex; height; 100vh; align-items:center; justify-content:center">
        
      <div style="display:flex; height:100vh; align-items:center; justify-content:center">
      <h1 class = "glow">
        Surprise unlocked, wait for a moment!
        </h1>
      </div>
      `;
      setTimeout(() => {
        window.location.replace("surprise.html");
      }, 5000);
    } else {
      suriprise = "";
    }
  } else if (e.key == "m" || e.key == "M") {
    suriprise += "m";
  } else if (suriprise == "m") {
    if (e.key == "e" || e.key == "E") {
      suriprise += "e";
    } else {
      suriprise = "";
    }
  } else if (suriprise == "me") {
    if (e.key == "n" || e.key == "N") {
      suriprise += "n";
    } else {
      suriprise = "";
    }
  } else if (suriprise == "men") {
    if (e.key == "u" || e.key == "U") {
      Swal.fire(
        `Spacebar Key - Play the Music \n
        Esc Key - Pause the Music \n
        MENU/menu - Display All Shortcut Keys \n
        Arrow Keys - Change Quotation \n
        bg/BG - Surprise ... \n
        Enter Key - Disappear menu`
      );

      suriprise = "";
    } else {
      suriprise = "";
    }
  }
});

function divToImg() {
  $("#download").click();
}

$(document).ready(function () {
  var element = $("#quote-section");

  $("#download").on("click", function () {
    html2canvas(element, {
      onrendered: function (canvas) {
        var imageData = canvas.toDataURL("image/jpg");
        var newData = imageData.replace(
          /^data:image\/jpg/,
          "data:application/octet-stream"
        );
        $("#download").attr("download", "image.jpg").attr("href", newData);
      },
    });
  });
});

window.addEventListener("resize", () => {
  divToImg();
});
