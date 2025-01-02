function toUnicodeVariant(str, variant) {
    const offsets = {
        bold: [
            '𝗔'.codePointAt(0) - 'A'.codePointAt(0),
            '𝗮'.codePointAt(0) - 'a'.codePointAt(0),
        ],
        italic: [
            '𝘈'.codePointAt(0) - 'A'.codePointAt(0),
            '𝘢'.codePointAt(0) - 'a'.codePointAt(0),
        ],
        bolditalic: [
            '𝘼'.codePointAt(0) - 'A'.codePointAt(0),
            '𝙖'.codePointAt(0) - 'a'.codePointAt(0),
        ]
    };

    const offset = offsets[variant];
    if (!offset) return str;

    return [...str].map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(code + offset[0]);
        } else if (code >= 97 && code <= 122) {
            return String.fromCodePoint(code + offset[1]);
        }
        return char;
    }).join('');
}

function formatText(text, attributes) {
    if (!attributes) return text;

    // Apply bold and italic formatting
    if (attributes.bold && attributes.italic) {
        text = toUnicodeVariant(text, 'bolditalic');
    } else if (attributes.bold) {
        text = toUnicodeVariant(text, 'bold');
    } else if (attributes.italic) {
        text = toUnicodeVariant(text, 'italic');
    }

    // Apply underline
    if (attributes.underline) {
        text = text.split('').join('̲') + '̲';
    }

    // Apply strikethrough
    if (attributes.strike) {
        text = text.split('').join('̶') + '̶';
    }

    return text;
}

function handleListItem(text, attributes) {
    if (!text.trim()) return text;

    if (attributes && attributes.list === 'bullet') {
        return `• ${text.trim()}`;
    } else if (text.trim().startsWith('- ')) {
        return `• ${text.trim().slice(2)}`;
    }
    return text;
}

document.getElementById('convertBtn').addEventListener('click', function() {
    const delta = quill.getContents();
    let textOutput = '';
    let currentLine = '';
    let isInList = false;

    delta.ops.forEach((op, index) => {
        if (!op.insert) return;

        let text = op.insert;

        // Handle newlines and lists
        if (text === '\n') {
            if (currentLine) {
                textOutput += handleListItem(currentLine, op.attributes) + '\n';
                currentLine = '';
            }
            isInList = op.attributes && op.attributes.list;
        } else {
            // Format the text with styling
            text = formatText(text, op.attributes);

            // Add to current line
            currentLine += text;

            // If this is the last operation, add the current line
            if (index === delta.ops.length - 1) {
                textOutput += handleListItem(currentLine, op.attributes);
            }
        }
    });

    // Clean up the output and update the textarea
    document.getElementById('output').value = textOutput
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n');
});
