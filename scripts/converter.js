const UNICODE_VARIANTS = {
    bold: [0x1D400, 0x1D41A],
    italic: [0x1D434, 0x1D44E],
    bolditalic: [0x1D468, 0x1D482],
    script: [0x1D49C, 0x1D4B6],
    boldscript: [0x1D4D0, 0x1D4EA],
    monospace: [0x1D670, 0x1D68A]
};

function toUnicodeVariant(str, variant, flags) {
    const offsets = UNICODE_VARIANTS[variant] || UNICODE_VARIANTS.bold;
    return str.split('').map(c => {
        const cp = c.codePointAt(0);
        if (cp >= 0x41 && cp <= 0x5A) {
            return String.fromCodePoint(cp - 0x41 + offsets[0]);
        } else if (cp >= 0x61 && cp <= 0x7A) {
            return String.fromCodePoint(cp - 0x61 + offsets[1]);
        } else {
            return c;
        }
    }).join('');
}

function applyTextAttributes(text, attributes) {
    if (attributes.bold && attributes.italic) {
        text = toUnicodeVariant(text, 'bolditalic');
    } else if (attributes.bold) {
        text = toUnicodeVariant(text, 'bold');
    } else if (attributes.italic) {
        text = toUnicodeVariant(text, 'italic');
    }

    if (attributes.underline) text = `̲${text}̲`;
    if (attributes.strike) text = `̶${text}̶`;
    if (attributes.background) text = `█${text}█`;
    if (attributes.list === 'bullet') text = `• ${text}`;
    if (attributes.list === 'ordered') text = `1. ${text}`;

    if (attributes.size) {
        switch (attributes.size) {
            case 'small': text = `˙${text}˙`; break;
            case 'large': text = `᚛${text}᚜`; break;
            case 'huge': text = `⁅${text}⁆`; break;
        }
    }

    return text;
}

function convertText() {
    try {
        if (!quill || !quill.getContents) {
            throw new Error('Quill editor not properly initialized');
        }

        const delta = quill.getContents();
        let textOutput = [];

        delta.ops.forEach(op => {
            if (op.insert) {
                let text = op.insert;
                if (op.attributes) {
                    text = applyTextAttributes(text, op.attributes);
                }
                textOutput.push(text);
            }
        });

        document.getElementById('output').value = textOutput.join('');
        updateStatus('Conversion complete');
    } catch (error) {
        console.error('Error during text conversion:', error);
        document.getElementById('output').value = 'An error occurred during conversion.';
        updateStatus('Conversion failed');
    }
}

function clearText() {
    quill.setText('');
    document.getElementById('output').value = '';
    updateStatus('Text cleared');
}

function updateStatus(message) {
    const status = document.getElementById('status');
    if (status) {
        status.textContent = message;
    }
}

document.getElementById('convertBtn').addEventListener('click', convertText);
document.getElementById('clearBtn').addEventListener('click', clearText);
