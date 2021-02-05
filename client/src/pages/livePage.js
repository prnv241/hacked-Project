import React, { Component } from "react";
import io from "socket.io-client";
import Peer from 'peerjs';
import { Button } from "@material-ui/core";

export class livePage extends Component {
    componentDidMount() {
        const socket = io("http://127.0.0.1:5001");
        const videoGrid = document.getElementById("video-grid");
        const myPeer = new Peer(undefined, {
            host: "/",
            port: "3001",
        });
        const myVideo = document.createElement("video");
        myVideo.muted = true;
        const Peers = {};
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                addVideoStream(myVideo, stream);

                myPeer.on("call", (call) => {
                    call.answer(stream);
                    const video = document.createElement("video");
                    call.on("stream", (userVideoStream) => {
                        addVideoStream(video, userVideoStream);
                    });
                });

                socket.on("user-connected", (userId) => {
                    connectToNewUser(userId, stream);
                });

                document
                    .getElementById("closebut")
                    .addEventListener("click", async () => {
                        try {
                            stream.getTracks().forEach(function (track) {
                                track.stop();
                            });
                            this.props.history.push("/");
                        } catch (err) {
                            console.log(err);
                        }
                    });
            });

        socket.on("user-disconnected", (userId) => {
            if (Peers[userId]) {
                Peers[userId].close();
            }
        });

        myPeer.on("open", (id) => {
            socket.emit("join-room", this.props.match.params.id, id);
        });

        function connectToNewUser(userId, stream) {
            const call = myPeer.call(userId, stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                console.log("STREAM>>> ")
                addVideoStream(video, userVideoStream);
            });
            call.on("close", () => {
                video.remove();
            });
            Peers[userId] = call;
        }

        function addVideoStream(video, stream) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
            videoGrid.append(video);
        }
    }

    render() {
        return (
            <div>
                <div style={{ margin: "6rem" }}>
                    <div>
                        <h2>Call Connected</h2>
                    </div>
                    <p>Meeting Id - {this.props.match.params.id}</p>
                    <small>Share this meeting ID to join other people this meeting</small>
                </div>
                <div id="video-grid" className="mt-5"></div>
                <div style={{ margin: "50px" }}>
                    <Button
                        id="closebut"
                    >
                        Leave
          </Button>
                </div>
            </div>
        );
    }
}

export default livePage;