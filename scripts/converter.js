function toUnicodeVariant(str, variant) {
    // ... (keep the existing toUnicodeVariant function)
}

document.getElementById('convertBtn').addEventListener('click', function () {
    const delta = quill.getContents();
    let textOutput = '';
    let inList = false;
    let listType = '';

    console.log('Starting conversion process');

    delta.ops.forEach((op, index) => {
        console.log(`Processing op ${index}:`, op);

        if (op.insert) {
            let text = op.insert;
            let prefix = '';

            if (op.attributes) {
                console.log('Attributes:', op.attributes);

                if (op.attributes.list === 'bullet') {
                    prefix = '• ';
                    console.log('Adding bullet prefix');
                } else if (op.attributes.list === 'ordered') {
                    prefix = '1. ';
                    console.log('Adding numbered list prefix');
                }

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

            console.log(`Adding to output: "${prefix}${text}"`);
            textOutput += prefix + text;
        }
    });

    console.log('Final output:', textOutput);
    document.getElementById('output').value = textOutput;
});
