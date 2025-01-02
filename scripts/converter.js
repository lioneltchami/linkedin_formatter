document.getElementById('convertBtn').addEventListener('click', function () {
    const delta = quill.getContents();
    let textOutput = '';
    let inList = false;
    let listType = '';

    delta.ops.forEach((op) => {
        if (op.insert) {
            let text = op.insert;
            let prefix = '';

            if (op.attributes) {
                if (op.attributes.list === 'bullet') {
                    if (!inList || listType !== 'bullet') {
                        prefix = '• ';
                        inList = true;
                        listType = 'bullet';
                    } else {
                        prefix = '\n• ';
                    }
                } else if (op.attributes.list === 'ordered') {
                    if (!inList || listType !== 'ordered') {
                        prefix = '1. ';
                        inList = true;
                        listType = 'ordered';
                    } else {
                        prefix = '\n1. ';
                    }
                } else {
                    inList = false;
                    listType = '';
                }

                if (op.attributes.bold && op.attributes.italic) {
                    text = toUnicodeVariant(text, 'bolditalic');
                } else if (op.attributes.bold) {
                    text = toUnicodeVariant(text, 'bold');
                } else if (op.attributes.italic) {
                    text = toUnicodeVariant(text, 'italic');
                }

                // Other formatting options remain the same
                // ...
            }
            textOutput += prefix + text;
        }
    });

    document.getElementById('output').value = textOutput;
});
