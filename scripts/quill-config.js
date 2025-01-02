var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar'
    },
    placeholder: 'You want to write and format your LinkedIn posts in Microsoft Word but lose all formatting when copying it over?\n\nWith this easy tool, you can copy paste your formatted texts from Word and convert them to LinkedIn compatible unicode texts.\n\nHow it works:\n1. Copy the text you want to convert from Word into the editor.\n2. Click the "Convert to LinkedIn" button.\n3. Copy the converted text from the output box and paste it into the LinkedIn post editor.\n\n\nLimitations: Some advanced formatting may not be fully supported in LinkedIn.',
});
