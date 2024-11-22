<template>
  <div>
    <vs-dialog
      v-model="dialog"
      class="dialog"
      prevent-close
      :loading="isLoading"
      @close="handleClose"
    >
      <template #header>
        <h4 class="not-margin"><b>Barcode Scanner</b></h4>
      </template>

      <div class="scanner-container">
        <div v-show="!isLoading">
          <template v-if="isScanner">
            <video poster="data:image/gif,AAAA" ref="scanner"></video>
            <div class="overlay-element"></div>
            <div class="laser"></div>
          </template>
          <template v-else>
            <video ref="scanner" autoplay></video>
            <canvas ref="canvas" style="display: none;"></canvas>
            <div class="capture-button">
              <vs-button @click="takePhoto">Capture</vs-button>
              <vs-button @click="handleSubmitPhoto">Submit</vs-button>
            </div>
            <div v-if="photos.length > 0">
              <h3>Captured Photos:</h3>
              <div style="margin-bottom: 10px;" class="thumbnails">
                <div v-for="(photo, index) in photos" :key="index" class="photo-container">
                  <div class="overlay-element"></div>
                  <i class="bx bx-x" @click="removePhoto(index)"></i>
                  <img :src="photo" :alt="'Captured Image ' + (index + 1)"/>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <template #footer>
        <div>
          <el-select
            placeholder="Camera"
            v-model="cameraSource"
            size="default"
            class="select-devices"
            @change="loadScanner"
          >
            <el-option
              v-for="camera in availableCameras"
              :key="camera.deviceId"
              :label="camera.label"
              :value="camera.deviceId"
            >
              {{ camera.label }}
            </el-option>
          </el-select>
          <template>
            <vs-row>
              <vs-col w="6">
                <el-upload
                  ref="upload"
                  v-model:file-list="files"
                  action=""
                  class="upload-demo"
                  :before-upload="beforeUpload"
                  multiple
                  accept="image/*,application/pdf"
                  :http-request="handleUploadFile"
                >
                  <vs-button>Upload</vs-button>
                </el-upload>
              </vs-col>
              <vs-col w="6" style="display: flex; justify-content: center;">
                <vs-button @click="toggleScan">{{ listenButtonLabel }}</vs-button>
              </vs-col>
            </vs-row>
          </template>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Exception,
} from "@zxing/library";
import master from "@/mixins/master"

export default {
  mixins: [master],
  props: {
    handleSubmit: Function,
    handleUpload: Function,
  },
  data() {
    return {
      dialog: false,
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        // eslint-disable-next-line operator-linebreak
        navigator &&
        // eslint-disable-next-line operator-linebreak
        navigator.mediaDevices &&
        "enumerateDevices" in navigator.mediaDevices,
      cameraSource: "",
      scannerRunning: false,
      availableCameras: [],
      eventNameSpace: null,
      isScanner: true,
      files: [],
      photos: []
    };
  },

  watch: {},

  computed: {
    listenButtonLabel() {
      return this.isScanner ? "Take Photo" : "Scan"
    }
  },

  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
    }
  },

  beforeUnmount() {
    if (this.scannerRunning) {
      this.codeReader.reset();
    }
  },

  methods: {
    async getAvailableDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );

        this.availableCameras = cameras.map((camera) => ({
          deviceId: camera.deviceId,
          label: camera.label || `Camera ${cameras.indexOf(camera) + 1}`,
        }));

        if (this.availableCameras.length > 0) {
          this.cameraSource = this.availableCameras[0].deviceId;
        }
      } catch (error) {
        this.infoError(error);
      }
    },

    async open(eventNameSpace) {
      this.dialog = true;
      this.eventNameSpace = eventNameSpace;

      await this.getAvailableDevices();

      this.loadScanner();
    },

    scan(cameraSource) {
      this.codeReader.decodeFromVideoDevice(
        cameraSource,
        this.$refs.scanner,
        (result, err) => {
          if (result) {
            // this.$emit("decode", result.text);
            // this.$emit("result", result);

            this.emitEvent("result", result);
            // this.handleClose();
          }

          if (err && !(err instanceof NotFoundException)) {
            this.infoError(err);
          }
        }
      );

      this.scannerRunning = true;
    },

    loadScanner() {
      this.isLoading = true;
      if (this.scannerRunning) {
        this.codeReader.reset();
      }

      this.scan(this.cameraSource);
      this.$refs.scanner.oncanplay = (event) => {
        this.isLoading = false;
        this.$emit("loaded");
      };
    },

    handleClose() {
      if (this.scannerRunning) {
        this.codeReader.reset();
      }

      this.scannerRunning = false;
      this.dialog = false;
      this.isLoading = true;
    },

    infoError(message) {
      this.emitEvent("error", message);
    },

    emitEvent(event, data) {
      this.$emit("data", {
        event,
        namespace: this.eventNameSpace,
        data,
      });
    },

    async beforeUpload(file) {
        if (!file.type.includes("image/") && !file.type.includes("application/pdf")) {
            this.openNotification('danger', '', 'Invalid File Type', 'Only PDF or Images allowed')
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Invalid File Type', 'Only PDF or Images allowed')
            return false
        }
        this.files.push(file);
    },

    toggleScan() {
      this.isScanner = this.isScanner ^ 1
    },

    takePhoto() {
      const video = this.$refs.scanner;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");

      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;

      context.drawImage(video, 0, 0, 368, 276);

      const photo = canvas.toDataURL("image/png");
      this.photos.push(photo);
    },

    removePhoto(index) {
      this.photos.splice(index, 1);
    },

    handleUploadFile() {
      this.handleUpload(this.files)
      this.$refs.upload.clearFiles();
      this.files = []

    },

    handleSubmitPhoto() {
      this.handleSubmit(this.photos)
      this.photos = []
    }
  },
};
</script>

<style scoped>
.dialog >>> .vs-dialog {
  max-width: 400px !important;
  min-width: 400px !important;
  width: 100%;
}

.barcode-scanner {
  border: 1px #6c7784 solid;
  padding: 0px;
  margin-bottom: 10px;
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.select-devices.el-select {
  border-radius: none !important;
  border: none !important;
}

video {
  max-width: 100%;
  max-height: 100%;
}
.scanner-container {
  position: relative;
}

.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);

  -webkit-clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
  clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
}

.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}

.capture-button {
  display: flex;
  gap: 0.5em;
  justify-content: center;
}

.thumbnails {
  display: flex;
  gap: 0.5em;
  overflow-x: scroll;
}

.photo-container {
  position: relative;
  i {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 3.5em;
    color: #ff4757;
  }
  .overlay-element {
    -webkit-clip-path: none;
    clip-path: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
}

.photo-container:hover {
  i {
    display: block;
    cursor: pointer;
  }
  .overlay-element {
    opacity: 0.75;
  }
}


@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}

@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>
