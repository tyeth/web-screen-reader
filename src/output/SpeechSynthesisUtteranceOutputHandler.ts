import { AbstractOutputHandler } from "./AbstractOutputHandler";

export class SpeechSynthesisUtteranceOutputHandler extends AbstractOutputHandler {
    private voices: any;

    public init(): void {
        this.voices = window.speechSynthesis.getVoices();
    }

    private _defaultVoice: any = null;
    public get defaultVoice(): any {
        if (this._defaultVoice == null) this.getVoice();
        return this._defaultVoice;
    }
    public set defaultVoice(voice: any) {
        this._defaultVoice = voice;
        let msg: string = voice.default ? "Using Default Voice:" : "Using Voice:";
        console.info(msg, (<any>voice).name)
    }

    private getVoice(): any {
        if (this._defaultVoice == null) {
            this.voices = window.speechSynthesis.getVoices();
            for (let voice in this.voices) {
                if ((<any>voice).default) {
                    this.defaultVoice = voice;
                    break;
                }
            }
            this.defaultVoice = (this._defaultVoice == null) ?
                this.voices[0] : this._defaultVoice;
        }
        return this.defaultVoice;
    }

    public output(text: string): void {
        console.info("Saying:", text);
        var msg = new (<any>this.window).SpeechSynthesisUtterance(text);
        msg.voice = this.defaultVoice;
        window.speechSynthesis.speak(msg);
    }

    public abort(): void {
        window.speechSynthesis.cancel();
    }
}