# FiveM Realtime GameView for HTML

[Original script](https://github.com/citizenfx/screenshot-basic) made by [citizenfx](https://github.com/citizenfx)

[In-game streaming platform demonstration using utk_render](https://github.com/utkuali/utk_streamer)

## Installation

- Put utk_render in your resource folder and start it like any other resource

- script.js has a small config in it which you can define default upload url and field

## Usage

- in your html file put this code inside your body tag and make sure it's loaded before your scripts:

```html
<script type="module" src="nui://utk_render/script.js"></script>
```

## Handling Screenshot Uploads

To handle screenshot upload requests you can use this php code: https://github.com/melihozkara/fivem-php-img-uploader

### Functions

#### Request Screenshot

Takes a screenshot and uploads it to the defined url

- Async method:

    ```js
    async function takeScreenshot() {
        let resp = await MainRender.requestScreenshot("www.exampleupload.com", "files[]");
        console.log("resp", resp);
    }
    ```

- Normal method:

    ```js
    MainRender.requestScreenshot("www.exampleupload.com", "files[]").then((resp) => {
        console.log("resp", resp);
    })
    ```

#### Render GameView to a canvas element

Can be used for a lot of stuff: video calls, video record, live stream ...

- Start canvas render

    ```js
    const canvas = document.getElementById("videocall-canvas");

    MainRender.renderToTarget(canvas);
    ```

- Stop canvas render

    ```js
    MainRender.stop();
    ```

## Basic Example

- html

    ```html
    <body>
        <button id="start">Start Video Call</button>
        <button id="stop" disabled>Stop Video Call</button>
        <canvas id="videocall-canvas" style="display: none; position: absolute; width: 250px; height: 575px; right: 5px; bottom: 5px; border: solid 5px red;"></canvas>

        <script type="module" src="nui://utk_render/script.js"></script>
        <script src="index.js"></script>
    </body>
    ```

- index.js

    ```js
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const canvas = document.getElementById("videocall-canvas");

    startButton.addEventListener("click", () => {
        canvas.style.display = "block"
        MainRender.renderToTarget(canvas);
        stopButton.disabled = true;
        startButton.disabled = false;
    });

    stopButton.addEventListener("click", () => {
        MainRender.stop();
        stopButton.disabled = false;
        startButton.disabled = true;
    });
    ```

## Important Note

Realtime render was made for my own phone therefore, render width and height ratio is fixed for 250px 575px which is 10 / 23 however, you can change this by some simple edits:

- script.js line:37 and line:97

    ```js
    // this width is 10 / 23 which is 250 to 575
    const width = Math.floor(window.innerHeight * 10 / 23);

    // 3rd parameter is left offset for the camera, setting it to 0 means most left side of the game, setting it to window.innerWidth / 2 means half of the game
    cameraRTT.setViewOffset(window.innerWidth, window.innerHeight, window.innerWidth / 3.5, 0, width, window.innerHeight);
    ```

To create a functional video call script, you need to look into [WebRTC](https://webrtc.org/)
