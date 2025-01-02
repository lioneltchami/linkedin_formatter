function toUnicodeVariant(str, variant) {
    // ... (keep the existing toUnicodeVariant function)
}

function convertToListOrText(text) {
    return text.split('\n').map(line => {
        line = line.trim();
        return line.startsWith('- ') ? `• ${line.slice(2)}` : line;
    }).join('\n');
}

document.getElementById('convertBtn').addEventListener('click', function () {
    const delta = quill.getContents();
    let textOutput = '';

    console.log('Starting conversion process');

    delta.ops.forEach((op, index) => {
        console.log(`Processing op ${index}:`, op);

        if (op.insert) {
            let text = convertToListOrText(op.insert);

            if (op.attributes) {
                console.log('Attributes:', op.attributes);

                if (op.attributes.bold && op.attributes.italic) {
                    text = toUnicodeVariant(text, 'bolditalic');
                    console.log('Applied bold and italic');
                } else if (op.attributes.bold) {
                    text = toUnicodeVariant(text, 'bold');
                    console.log('Applied bold');
                } else if (op.attributes.italic) {
                    text = toUnicodeVariant(text, 'italic');
                    console.log('Applied italic');
                }

                // Other formatting options...
            }

            console.log(`Adding to output: "${text}"`);
            textOutput += text;
        }
    });

    console.log('Final output:', textOutput);
    document.getElementById('output').value = textOutput.trim();
});
