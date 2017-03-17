import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class TextAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        for (let i = 0; i < node.childNodes.length; i++) {
            let childNode = node.childNodes[i];
            if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim()) {
                // only if this has direct text nodes, speak them out
                return true;
            }
        }
        return false;
    }
}