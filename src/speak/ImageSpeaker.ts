import { AbstractSpeaker } from "./AbstractSpeaker";

export class ImageSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        const text = node.getAttribute("aria-label") || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}