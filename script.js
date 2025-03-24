// Add typing effect to subtitle
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    const commandLines = document.querySelectorAll('.command-line');
    const outputs = document.querySelectorAll('.output');
    let delay = 0;

    // Hide all outputs initially
    outputs.forEach(output => {
        output.style.display = 'none';
    });

    // Type out commands and show outputs with delay
    commandLines.forEach((line, index) => {
        const command = line.querySelector('.command');
        const originalText = command.textContent;
        command.textContent = '';
        let i = 0;

        setTimeout(() => {
            function typeCommand() {
                if (i < originalText.length) {
                    command.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                } else {
                    // Show corresponding output after command is typed
                    if (outputs[index]) {
                        outputs[index].style.display = 'block';
                    }
                }
            }
            typeCommand();
        }, delay);
        delay += 1000; // Add delay between each command
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px rgba(0, 255, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}); 
