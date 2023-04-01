function splitText(text, segmentSize) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    let currentSegment = '';
    let segments = [];

    sentences.forEach(sentence => {
        if (currentSegment.length + sentence.length > segmentSize) {
            segments.push(currentSegment);
            currentSegment = '';
        }
        currentSegment += sentence;
    });

    if (currentSegment) {
        segments.push(currentSegment);
    }

    return segments;
}

function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

document.getElementById('process-text').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value;
    const customPretext = document.getElementById('custom-pretext').value;
    const segmentSize = parseInt(document.getElementById('segment-size').value);
    
    const segments = splitText(inputText, segmentSize);
    const segmentsContainer = document.getElementById('segments-container');
    segmentsContainer.innerHTML = '';

    segments.forEach((segment, index) => {
        const button = document.createElement('button');
        button.textContent = `Segment ${index + 1}`;
        button.classList.add('segment-button');
        button.addEventListener('click', () => {
            copyToClipboard(customPretext + segment);
            button.disabled = true;
        });
        segmentsContainer.appendChild(button);
    });
});
