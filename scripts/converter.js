function toUnicodeVariant(str, variant) {
    // ... (keep the existing toUnicodeVariant function)
}

function convertToListOrText(text) {
    return text.split('\n').map(line => {
        line = line.trim();
        if (line.startsWith('- ')) {
            return `• ${line.slice(2)}`;
        } else if (line.startsWith('• ')) {
            return line;
        }
        return line;
    }).join('\n');
}


document.getElementById('convertBtn').addEventListener('click', function () {
    const delta = quill.getContents();
    let textOutput = '';
    let pendingListItem = false;

    console.log('Starting conversion process');

    delta.ops.forEach((op, index) => {
        console.log(`Processing op ${index}:`, op);

        if (op.insert) {
            let text = op.insert;
            let attributes = op.attributes || {};

            if (pendingListItem) {
                text = `• ${text.trimStart()}`;
                pendingListItem = false;
            }

            text = convertToListOrText(text, attributes);

            if (attributes.list === 'bullet' && text.trim() === '') {
                pendingListItem = true;
            }

            if (attributes.bold && attributes.italic) {
                text = toUnicodeVariant(text, 'bolditalic');
                console.log('Applied bold and italic');
            } else if (attributes.bold) {
                text = toUnicodeVariant(text, 'bold');
                console.log('Applied bold');
            } else if (attributes.italic) {
                text = toUnicodeVariant(text, 'italic');
                console.log('Applied italic');
            }

            console.log(`Adding to output: "${text}"`);
            textOutput += text;
        }
    });

    console.log('Final output:', textOutput);
    document.getElementById('output').value = textOutput.trim();
});
