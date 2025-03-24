// Development flag - set to true for instant rendering during development
const DEV_MODE = true;

// Add typing effect to subtitle
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.subtitle');
    const commandLines = document.querySelectorAll('.command-line');
    const outputs = document.querySelectorAll('.output');
    let delay = 0;

    // Function to show all outputs instantly
    function showAllOutputs() {
        outputs.forEach(output => {
            output.style.display = 'block';
        });
        commandLines.forEach(line => {
            const command = line.querySelector('.command');
            if (command && command.textContent !== '_') {
                command.textContent = command.getAttribute('data-original') || command.textContent;
            }
        });
    }

    // Function to animate the content
    function animateContent() {
        // Reset outputs
        outputs.forEach(output => {
            output.style.display = 'none';
        });

        // Animate subtitle
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

        // Animate commands
        commandLines.forEach((line, index) => {
            const command = line.querySelector('.command');
            if (command && command.textContent !== '_') {
                const originalText = command.textContent;
                command.setAttribute('data-original', originalText);
                command.textContent = '';
                let i = 0;

                setTimeout(() => {
                    function typeCommand() {
                        if (i < originalText.length) {
                            command.textContent += originalText.charAt(i);
                            i++;
                            setTimeout(typeCommand, 50);
                        } else {
                            if (outputs[index]) {
                                outputs[index].style.display = 'block';
                            }
                        }
                    }
                    typeCommand();
                }, delay);
                delay += 1000;
            }
        });
    }

    // Initial render based on DEV_MODE
    if (DEV_MODE) {
        showAllOutputs();
    } else {
        animateContent();
    }

    // Handle ls output line click
    const lsLines = document.querySelectorAll('.ls-line');
    lsLines.forEach(line => {
        line.addEventListener('click', () => {
            // Collapse all project cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Collapse all ls lines
            lsLines.forEach(l => {
                l.classList.remove('collapsed');
            });

            // Expand the clicked line and its project card
            line.classList.add('collapsed');
            const projectCard = line.nextElementSibling;
            if (projectCard && projectCard.classList.contains('project-card')) {
                projectCard.classList.add('expanded');
            }
        });
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
