import {
  require_lib
} from "./chunk-OJLGNVLA.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-OAEVIACX.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  isAuth
} from "./chunk-DJCOHPHY.js";
import {
  CommonModule,
  NgClass
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  ViewChild,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import {
  __toESM
} from "./chunk-3WPM564S.js";

// src/app/componentes/video.ts
var import_socket = __toESM(require_lib());
var _c0 = ["localVideo"];
var _c1 = ["mainContainer"];
function VideoComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h1");
    \u0275\u0275text(2, "Sorry, this works only with Google Chrome");
    \u0275\u0275elementEnd()();
  }
}
function VideoComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "p", 4);
    \u0275\u0275text(2, "Define tu nombre de usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function VideoComponent_Conditional_1_Conditional_0_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.username, $event) || (ctx_r1.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 6);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.connect());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275element(7, "video", 8, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Conectarse a ", ctx_r1.currentUrl);
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleScreen());
    });
    \u0275\u0275element(1, "i", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.screen() ? "bi-display-fill" : "bi-slash-square-fill");
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.newMessages(), " ");
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_8_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r6.sender);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(": ", msg_r6.data, " ");
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_8_For_1_Template, 4, 2, "p", 37, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275repeater(ctx_r1.messages());
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1, "Todav\xEDa no hay mensajes");
    \u0275\u0275elementEnd();
  }
}
function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "h5", 31);
    \u0275\u0275text(5, "Chat del grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 32);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.closeChat());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 33);
    \u0275\u0275conditionalCreate(8, VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_8_Template, 2, 0)(9, VideoComponent_Conditional_1_Conditional_1_Conditional_11_Conditional_9_Template, 2, 0, "p", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 35)(11, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.chatInput, $event) || (ctx_r1.chatInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template_input_keyup_enter_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 6);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275text(13, "Enviar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.messages().length > 0 ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.chatInput);
  }
}
function VideoComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "button", 10);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleVideo());
    });
    \u0275\u0275element(2, "i", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 12);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleEndCall());
    });
    \u0275\u0275element(4, "i", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 10);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleAudio());
    });
    \u0275\u0275element(6, "i", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, VideoComponent_Conditional_1_Conditional_1_Conditional_7_Template, 2, 1, "button", 14);
    \u0275\u0275elementStart(8, "button", 15);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openChat());
    });
    \u0275\u0275element(9, "i", 16);
    \u0275\u0275conditionalCreate(10, VideoComponent_Conditional_1_Conditional_1_Conditional_10_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, VideoComponent_Conditional_1_Conditional_1_Conditional_11_Template, 14, 2, "div", 18);
    \u0275\u0275elementStart(12, "div", 19)(13, "div", 20)(14, "button", 21);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.copyUrl());
    });
    \u0275\u0275element(15, "i", 22);
    \u0275\u0275text(16, " Copiar enlace de invitaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 23);
    \u0275\u0275listener("click", function VideoComponent_Conditional_1_Conditional_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.shareUrl());
    });
    \u0275\u0275element(18, "i", 24);
    \u0275\u0275text(19, " Compartir ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "hr");
    \u0275\u0275elementStart(21, "span", 25);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 26, 1);
    \u0275\u0275element(25, "video", 27, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.video() ? "bi-camera-video-fill" : "bi-camera-video-off-fill");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.audio() ? "bi-mic-fill" : "bi-mic-mute-fill");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.screenAvailable() ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.newMessages() > 0 ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showModal() ? 11 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.username);
  }
}
function VideoComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VideoComponent_Conditional_1_Conditional_0_Template, 9, 2)(1, VideoComponent_Conditional_1_Conditional_1_Template, 27, 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.askForUsername() ? 0 : 1);
  }
}
var SERVER_URL = environment.apiURL;
var PEER_CONNECTION_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};
var VideoComponent = class _VideoComponent {
  localVideoRef;
  mainContainerRef;
  auth = isAuth();
  // Signals
  video = signal(false, ...ngDevMode ? [{ debugName: "video" }] : []);
  audio = signal(false, ...ngDevMode ? [{ debugName: "audio" }] : []);
  screen = signal(false, ...ngDevMode ? [{ debugName: "screen" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  screenAvailable = signal(false, ...ngDevMode ? [{ debugName: "screenAvailable" }] : []);
  askForUsername = signal(true, ...ngDevMode ? [{ debugName: "askForUsername" }] : []);
  newMessages = signal(0, ...ngDevMode ? [{ debugName: "newMessages" }] : []);
  messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : []);
  // Local State
  username = this.auth?.name ?? `User_${Math.floor(Math.random() * 1e4)}`;
  chatInput = "";
  currentUrl = window.location.href;
  socket;
  socketId = null;
  connections = {};
  localStream;
  videoAvailable = false;
  audioAvailable = false;
  elms = 0;
  ngOnInit() {
    this.getPermissions();
  }
  ngOnDestroy() {
    this.cleanUpStreams();
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  isChrome() {
    const userAgent = (navigator?.userAgent || "").toLowerCase();
    const vendor = (navigator?.vendor || "").toLowerCase();
    return /google inc/.test(vendor) && /(?:chrome|crios)\/(\d+)/.test(userAgent);
  }
  async getPermissions() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true }).then(() => this.videoAvailable = true).catch(() => this.videoAvailable = false);
      await navigator.mediaDevices.getUserMedia({ audio: true }).then(() => this.audioAvailable = true).catch(() => this.audioAvailable = false);
      this.screenAvailable.set(!!navigator.mediaDevices.getDisplayMedia);
      if (this.videoAvailable || this.audioAvailable) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: this.videoAvailable,
          audio: this.audioAvailable
        });
        this.localStream = stream;
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = stream;
        }
      }
    } catch (e) {
      console.error("Error getting permissions:", e);
    }
  }
  connect() {
    this.askForUsername.set(false);
    this.getMedia();
  }
  getMedia() {
    this.video.set(this.videoAvailable);
    this.audio.set(this.audioAvailable);
    this.getUserMedia();
    this.connectToSocketServer();
  }
  getUserMedia() {
    if (this.video() && this.videoAvailable || this.audio() && this.audioAvailable) {
      navigator.mediaDevices.getUserMedia({ video: this.video(), audio: this.audio() }).then(this.getUserMediaSuccess).catch((e) => console.error(e));
    } else {
      this.stopLocalTracks();
    }
  }
  getUserMediaSuccess = (stream) => {
    this.stopLocalTracks();
    this.localStream = stream;
    if (this.localVideoRef?.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = stream;
    }
    for (const id in this.connections) {
      if (id === this.socketId)
        continue;
      this.addTracksToPeer(this.connections[id], this.localStream);
      this.connections[id].createOffer().then((description) => {
        this.connections[id].setLocalDescription(description).then(() => {
          this.socket.emit("signal", id, JSON.stringify({ sdp: this.connections[id].localDescription }));
        });
      });
    }
    stream.getTracks().forEach((track) => {
      track.onended = () => {
        this.video.set(false);
        this.audio.set(false);
        this.stopLocalTracks();
        this.localStream = this.createBlackSilenceStream();
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = this.localStream;
        }
        for (const id in this.connections) {
          this.addTracksToPeer(this.connections[id], this.localStream);
          this.connections[id].createOffer().then((description) => {
            this.connections[id].setLocalDescription(description).then(() => {
              this.socket.emit("signal", id, JSON.stringify({ sdp: this.connections[id].localDescription }));
            });
          });
        }
      };
    });
  };
  getDisplayMedia() {
    if (this.screen() && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(this.getDisplayMediaSuccess).catch((e) => console.error(e));
    }
  }
  getDisplayMediaSuccess = (stream) => {
    this.stopLocalTracks();
    this.localStream = stream;
    if (this.localVideoRef?.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = stream;
    }
    for (const id in this.connections) {
      if (id === this.socketId)
        continue;
      this.addTracksToPeer(this.connections[id], this.localStream);
      this.connections[id].createOffer().then((description) => {
        this.connections[id].setLocalDescription(description).then(() => {
          this.socket.emit("signal", id, JSON.stringify({ sdp: this.connections[id].localDescription }));
        });
      });
    }
    stream.getTracks().forEach((track) => {
      track.onended = () => {
        this.screen.set(false);
        this.stopLocalTracks();
        this.localStream = this.createBlackSilenceStream();
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = this.localStream;
        }
        this.getUserMedia();
      };
    });
  };
  connectToSocketServer() {
    this.socket = (0, import_socket.default)(SERVER_URL, { secure: true });
    this.socket.on("signal", this.gotMessageFromServer);
    this.socket.on("connect", () => {
      this.socket.emit("join-call", window.location.href);
      this.socketId = this.socket.id || null;
      this.socket.on("chat-message", (data, sender, senderId) => {
        this.messages.update((prev) => [...prev, { sender, data }]);
        if (senderId !== this.socketId) {
          this.newMessages.update((count) => count + 1);
        }
      });
      this.socket.on("user-left", (id) => {
        const videoEl = document.querySelector(`[data-socket="${id}"]`);
        if (videoEl) {
          this.elms--;
          videoEl.remove();
          if (this.mainContainerRef?.nativeElement) {
            this.changeCssVideos(this.mainContainerRef.nativeElement);
          }
        }
      });
      this.socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          this.connections[socketListId] = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
          this.connections[socketListId].onicecandidate = (event) => {
            if (event.candidate) {
              this.socket.emit("signal", socketListId, JSON.stringify({ ice: event.candidate }));
            }
          };
          this.connections[socketListId].ontrack = (event) => {
            const existingVideo = document.querySelector(`[data-socket="${socketListId}"]`);
            if (existingVideo) {
              existingVideo.srcObject = event.streams[0];
            } else {
              this.elms = clients.length;
              const main = this.mainContainerRef.nativeElement;
              const cssMeasure = this.changeCssVideos(main);
              const video = document.createElement("video");
              video.style.minWidth = cssMeasure.minWidth;
              video.style.minHeight = cssMeasure.minHeight;
              video.style.maxHeight = "100%";
              video.style.margin = "10px";
              video.style.borderStyle = "solid";
              video.style.borderColor = "#bdbdbd";
              video.style.objectFit = "fill";
              video.style.setProperty("width", cssMeasure.width);
              video.style.setProperty("height", cssMeasure.height);
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.streams[0];
              video.autoplay = true;
              video.playsInline = true;
              main.appendChild(video);
            }
          };
          if (this.localStream) {
            this.addTracksToPeer(this.connections[socketListId], this.localStream);
          } else {
            this.localStream = this.createBlackSilenceStream();
            this.addTracksToPeer(this.connections[socketListId], this.localStream);
          }
        });
        if (id === this.socketId) {
          for (const id2 in this.connections) {
            if (id2 === this.socketId)
              continue;
            try {
              this.addTracksToPeer(this.connections[id2], this.localStream);
            } catch (e) {
            }
            this.connections[id2].createOffer().then((description) => {
              this.connections[id2].setLocalDescription(description).then(() => {
                this.socket.emit("signal", id2, JSON.stringify({ sdp: this.connections[id2].localDescription }));
              });
            });
          }
        }
      });
    });
  }
  gotMessageFromServer = (fromId, message) => {
    const signalData = JSON.parse(message);
    if (fromId !== this.socketId) {
      if (signalData.sdp) {
        this.connections[fromId].setRemoteDescription(new RTCSessionDescription(signalData.sdp)).then(() => {
          if (signalData.sdp.type === "offer") {
            this.connections[fromId].createAnswer().then((description) => {
              this.connections[fromId].setLocalDescription(description).then(() => {
                this.socket.emit("signal", fromId, JSON.stringify({ sdp: this.connections[fromId].localDescription }));
              });
            });
          }
        });
      }
      if (signalData.ice) {
        this.connections[fromId].addIceCandidate(new RTCIceCandidate(signalData.ice)).catch((e) => console.error(e));
      }
    }
  };
  addTracksToPeer(peer, stream) {
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
  }
  changeCssVideos(main) {
    const widthMain = main.offsetWidth;
    let minWidth = "30%";
    if (widthMain * 30 / 100 < 300) {
      minWidth = "300px";
    }
    const minHeight = "40%";
    let height = String(100 / this.elms) + "%";
    let width = "";
    if (this.elms === 0 || this.elms === 1) {
      width = "100%";
      height = "100%";
    } else if (this.elms === 2) {
      width = "45%";
      height = "100%";
    } else if (this.elms === 3 || this.elms === 4) {
      width = "35%";
      height = "50%";
    } else {
      width = String(100 / this.elms) + "%";
    }
    const videos = main.querySelectorAll("video");
    videos.forEach((vid) => {
      const v = vid;
      v.style.minWidth = minWidth;
      v.style.minHeight = minHeight;
      v.style.setProperty("width", width);
      v.style.setProperty("height", height);
    });
    return { minWidth, minHeight, width, height };
  }
  createBlackSilenceStream() {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    const audioTrack = Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    const canvas = Object.assign(document.createElement("canvas"), { width: 640, height: 480 });
    canvas.getContext("2d")?.fillRect(0, 0, 640, 480);
    const stream = canvas.captureStream();
    const videoTrack = Object.assign(stream.getVideoTracks()[0], { enabled: false });
    return new MediaStream([videoTrack, audioTrack]);
  }
  toggleVideo() {
    this.video.update((v) => !v);
    this.getUserMedia();
  }
  toggleAudio() {
    this.audio.update((a) => !a);
    this.getUserMedia();
  }
  toggleScreen() {
    this.screen.update((s) => !s);
    this.getDisplayMedia();
  }
  handleEndCall() {
    this.stopLocalTracks();
    window.location.href = "/";
  }
  openChat() {
    this.showModal.set(true);
    this.newMessages.set(0);
  }
  closeChat() {
    this.showModal.set(false);
  }
  sendMessage() {
    if (!this.chatInput.trim())
      return;
    this.socket.emit("chat-message", this.chatInput, this.username, this.socketId);
    this.chatInput = "";
  }
  copyUrl() {
    navigator.clipboard.writeText(this.currentUrl).then(() => alert("Link copiado a portapapeles!"), () => alert("Fall\xF3 la copia"));
  }
  async shareUrl() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invitaci\xF3n",
          text: "Te invito a unirte a este enlace:",
          url: this.currentUrl
        });
      } catch (error) {
        console.log("Error al compartir o compartido cancelado", error);
      }
    } else {
      this.copyUrl();
    }
  }
  stopLocalTracks() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
  }
  cleanUpStreams() {
    this.stopLocalTracks();
    for (const key in this.connections) {
      this.connections[key].close();
    }
    this.connections = {};
  }
  static \u0275fac = function VideoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VideoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VideoComponent, selectors: [["app-video-call"]], viewQuery: function VideoComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.localVideoRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mainContainerRef = _t.first);
    }
  }, decls: 2, vars: 1, consts: [["localVideo", ""], ["mainContainer", ""], [1, "unsupported-browser"], [1, "username-container"], [1, "title"], ["type", "text", "placeholder", "Username", 1, "form-control", "mb-3", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "local-preview-container"], ["autoplay", "", "muted", "", "playsinline", "", 1, "local-video-preview"], [1, "btn-down", "d-flex", "justify-content-center", "gap-3", "py-2", "bg-light", "border-top"], [1, "btn", "btn-secondary", 3, "click"], [1, "bi", 3, "ngClass"], [1, "btn", "btn-danger", 3, "click"], [1, "bi", "bi-telephone-x-fill"], [1, "btn", "btn-secondary"], [1, "btn", "btn-secondary", "position-relative", 3, "click"], [1, "bi", "bi-chat-dots-fill"], [1, "position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background-color", "rgba(0,0,0,0.5)", "z-index", "999999"], [1, "container", "py-3"], [1, "align-items-center", "text-center", "mb-3"], [1, "btn", "btn-outline-primary", "ms-2", "text-nowrap", 3, "click"], [1, "bi", "bi-copy"], ["title", "Compartir enlace", 1, "btn", "btn-outline-secondary", "ms-2", "text-nowrap", 3, "click"], [1, "bi", "bi-share"], [1, "text-info"], ["id", "main", 1, "d-flex", "flex-wrap", "justify-content-center", "align-items-center"], ["autoplay", "", "muted", "", "playsinline", "", 1, "local-video-grid"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body", "chat-box", 2, "height", "400px", "overflow-y", "auto"], [1, "text-muted"], [1, "modal-footer"], ["type", "text", "placeholder", "Message", 1, "form-control", "me-2", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "text-start", "text-break"]], template: function VideoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, VideoComponent_Conditional_0_Template, 3, 0, "div", 2)(1, VideoComponent_Conditional_1_Template, 2, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.isChrome() ? 0 : 1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.unsupported-browser[_ngcontent-%COMP%], \n.username-container[_ngcontent-%COMP%] {\n  background: white;\n  width: 30%;\n  min-width: 400px;\n  padding: 20px;\n  text-align: center;\n  margin: 50px auto;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.local-preview-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 40px;\n}\n.local-video-preview[_ngcontent-%COMP%] {\n  border: 2px solid #bdbdbd;\n  object-fit: cover;\n  width: 60%;\n  height: 300px;\n}\n.local-video-grid[_ngcontent-%COMP%] {\n  border: 2px solid #bdbdbd;\n  margin: 10px;\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n.btn-down[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  z-index: 1000;\n}\n/*# sourceMappingURL=video.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VideoComponent, [{
    type: Component,
    args: [{ selector: "app-video-call", standalone: true, imports: [CommonModule, FormsModule], template: `
    @if (!isChrome()) {
      <div class="unsupported-browser">
        <h1>Sorry, this works only with Google Chrome</h1>
      </div>
    } @else {
      @if (askForUsername()) {
        <div class="username-container">
          <p class="title">Define tu nombre de usuario</p>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Username"
            [(ngModel)]="username"
          />
          <button class="btn btn-primary" (click)="connect()">Conectarse a {{currentUrl}}</button>
        </div>

        <div class="local-preview-container">
          <video
            #localVideo
            autoplay
            muted
            playsinline
            class="local-video-preview"
          ></video>
        </div>
      } @else {
        <!-- Controls Footer -->
        <div class="btn-down d-flex justify-content-center gap-3 py-2 bg-light border-top">
          <button class="btn btn-secondary" (click)="toggleVideo()">
            <i class="bi" [ngClass]="video() ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'"></i>
          </button>

          <button class="btn btn-danger" (click)="handleEndCall()">
            <i class="bi bi-telephone-x-fill"></i>
          </button>

          <button class="btn btn-secondary" (click)="toggleAudio()">
            <i class="bi" [ngClass]="audio() ? 'bi-mic-fill' : 'bi-mic-mute-fill'"></i>
          </button>

          @if (screenAvailable()) {
            <button class="btn btn-secondary" (click)="toggleScreen()">
              <i class="bi" [ngClass]="screen() ? 'bi-display-fill' : 'bi-slash-square-fill'"></i>
            </button>
          }

          <button class="btn btn-secondary position-relative" (click)="openChat()">
            <i class="bi bi-chat-dots-fill"></i>
            @if (newMessages() > 0) {
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ newMessages() }}
              </span>
            }
          </button>
        </div>

        <!-- Chat Modal -->
        @if (showModal()) {
          <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5); z-index: 999999;">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Chat del grupo</h5>
                  <button type="button" class="btn-close" (click)="closeChat()"></button>
                </div>

                <div class="modal-body chat-box" style="height: 400px; overflow-y: auto;">
                  @if (messages().length > 0) {
                    @for (msg of messages(); track $index) {
                      <p class="text-start text-break">
                        <strong>{{ msg.sender }}</strong>: {{ msg.data }}
                      </p>
                    }
                  } @else {
                    <p class="text-muted">Todav\xEDa no hay mensajes</p>
                  }
                </div>

                <div class="modal-footer">
                  <input
                    type="text"
                    class="form-control me-2"
                    placeholder="Message"
                    [(ngModel)]="chatInput"
                    (keyup.enter)="sendMessage()"
                  />
                  <button class="btn btn-primary" (click)="sendMessage()">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Main Video Grid Container -->
        <div class="container py-3">
 <div class="align-items-center text-center mb-3">
  <!-- <input type="text" class="form-control" [value]="currentUrl" readonly /> -->
  <!-- Bot\xF3n Copiar -->
  <button class="btn btn-outline-primary ms-2 text-nowrap" (click)="copyUrl()">
    <i class="bi bi-copy"></i> Copiar enlace de invitaci\xF3n
  </button>
  
  <!-- Bot\xF3n Compartir (Nuevo) -->
  <button class="btn btn-outline-secondary ms-2 text-nowrap" (click)="shareUrl()" title="Compartir enlace">
    <i class="bi bi-share"></i> Compartir
  </button>
      <hr/>
  <span class="text-info">{{username}}</span>
</div>
          <div #mainContainer id="main" class="d-flex flex-wrap justify-content-center align-items-center">
            <video
              #localVideo
              autoplay
              muted
              playsinline
              class="local-video-grid"
            ></video>
          </div>
        </div>
      }
    }
  `, styles: ["/* angular:styles/component:css;f4b0a81a3f1c1b834fc8f707147c33f36334cb8b5052528b90e98165d37ed1ba;/home/linuxlite/WebMEAN/src/app/componentes/video.ts */\n.unsupported-browser,\n.username-container {\n  background: white;\n  width: 30%;\n  min-width: 400px;\n  padding: 20px;\n  text-align: center;\n  margin: 50px auto;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.local-preview-container {\n  text-align: center;\n  padding-top: 40px;\n}\n.local-video-preview {\n  border: 2px solid #bdbdbd;\n  object-fit: cover;\n  width: 60%;\n  height: 300px;\n}\n.local-video-grid {\n  border: 2px solid #bdbdbd;\n  margin: 10px;\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n.btn-down {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  z-index: 1000;\n}\n/*# sourceMappingURL=video.css.map */\n"] }]
  }], null, { localVideoRef: [{
    type: ViewChild,
    args: ["localVideo"]
  }], mainContainerRef: [{
    type: ViewChild,
    args: ["mainContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VideoComponent, { className: "VideoComponent", filePath: "src/app/componentes/video.ts", lineNumber: 184 });
})();
export {
  VideoComponent
};
//# sourceMappingURL=chunk-FLLQNGSH.js.map
