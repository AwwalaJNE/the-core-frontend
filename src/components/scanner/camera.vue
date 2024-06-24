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
          <video poster="data:image/gif,AAAA" ref="scanner"></video>
          <div class="overlay-element"></div>
          <div class="laser"></div>
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

export default {
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
    };
  },

  watch: {},

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
            this.handleClose();
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
