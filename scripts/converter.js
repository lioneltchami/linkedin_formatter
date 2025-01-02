function toUnicodeVariant(str, variant, flags) {
    const offsets = {
        'bold': [0x1D400, 0x1D41A],
        'italic': [0x1D434, 0x1D44E],
        'bolditalic': [0x1D468, 0x1D482],
        'script': [0x1D49C, 0x1D4B6],
        'boldscript': [0x1D4D0, 0x1D4EA],
        'monospace': [0x1D670, 0x1D68A]
    };

    const chars = str.split("");

    let result = "";
    for (let c of chars) {
        let cp = c.codePointAt(0);
        if (cp >= 0x41 && cp <= 0x5A) {
            result += String.fromCodePoint(cp - 0x41 + offsets[variant][0]);
        } else if (cp >= 0x61 && cp <= 0x7A) {
            result += String.fromCodePoint(cp - 0x61 + offsets[variant][1]);
        } else {
            result += c;
        }
    }

    return result;
}

document.getElementById('convertBtn').addEventListener('click', function () {
    const delta = quill.getContents();
    let textOutput = '';

    delta.ops.forEach((op) => {
        if (op.insert) {
            let text = op.insert;
            if (op.attributes) {
                if (op.attributes.bold && op.attributes.italic) {
                    text = toUnicodeVariant(text, 'bolditalic');
                } else if (op.attributes.bold) {
                    text = toUnicodeVariant(text, 'bold');
                } else if (op.attributes.italic) {
                    text = toUnicodeVariant(text, 'italic');
                }

                if (op.attributes.underline) {
                    text = '̲' + text + '̲';
                }
                if (op.attributes.strike) {
                    text = '̶' + text + '̶';
                }
                if (op.attributes.background) {
                    text = '█' + text + '█';
                }
                if (op.attributes.list === 'bullet') {
                    text = '• ' + text;
                }
                if (op.attributes.list === 'ordered') {
                    text = '1. ' + text;
                }
                if (op.attributes.size) {
                    switch (op.attributes.size) {
                        case 'small':
                            text = '˙' + text + '˙';
                            break;
                        case 'large':
                            text = '᚛' + text + '᚜';
                            break;
                        case 'huge':
                            text = '⁅' + text + '⁆';
                            break;
                    }
                }
            }
            textOutput += text;
        }
    });

    document.getElementById('output').value = textOutput;
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');

    // Optional: Provide visual feedback
    this.textContent = 'Copied!';
    setTimeout(() => {
        this.textContent = 'Copy';
    }, 2000);
});
