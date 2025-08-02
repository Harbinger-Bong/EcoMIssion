// Valid eco codes
    const validCodes = [
      'ECO101', 'ECO102', 'ECO103', 'ECO104', 'ECO105', 'ECO106', 'ECO107',
      'GREEN01', 'GREEN02', 'GREEN03', 'GREEN04', 'GREEN05', 'GREEN06', 'GREEN07',
      'RECYCLE01', 'RECYCLE02', 'RECYCLE03', 'PLANT01', 'PLANT02', 'PLANT03',
      'CLEAN01', 'CLEAN02', 'CLEAN03', 'SAVE01', 'SAVE02', 'SAVE03',
      'EARTH01', 'EARTH02', 'EARTH03', 'NATURE01', 'NATURE02', 'NATURE03'
    ];

    // Class progression system
    const ecoClasses = [
      { name: 'Eco Seedling', emoji: '🌱', className: 'class-seedling', minDays: 0 },
      { name: 'Green Sprout', emoji: '🌿', className: 'class-sprout', minDays: 1 },
      { name: 'Nature Sapling', emoji: '🌳', className: 'class-sapling', minDays: 2 },
      { name: 'Eco Tree', emoji: '🎋', className: 'class-tree', minDays: 3 },
      { name: 'Green Grove', emoji: '🌲', className: 'class-grove', minDays: 4 },
      { name: 'Eco Forest', emoji: '🌴', className: 'class-forest', minDays: 5 },
      { name: 'Eco Guardian', emoji: '🏆', className: 'class-guardian', minDays: 7 }
    ];

    // Game state
    let usedCodes = JSON.parse(localStorage.getItem('ecoMission_usedCodes')) || [];
    let credits = parseInt(localStorage.getItem('ecoMission_credits')) || 0;
    let completedDays = usedCodes.length;
    let currentDay = Math.min(completedDays + 1, 7);
    let currentClass = getCurrentClass(completedDays);

    // DOM elements
    const codeInput = document.getElementById('code-input');
    const feedback = document.getElementById('feedback-msg');
    const creditDisplay = document.getElementById('credit-count');
    const dayDisplay = document.getElementById('day-number');
    const completedDisplay = document.getElementById('completed-days');
    const progressGrid = document.getElementById('progress-grid');
    const achievementBadge = document.getElementById('achievement-badge');
    const submitBtn = document.getElementById('submit-btn');
    const classBadge = document.getElementById('class-badge');
    const streakFire = document.getElementById('streak-fire');

    // Get current class based on completed days
    function getCurrentClass(days) {
      for (let i = ecoClasses.length - 1; i >= 0; i--) {
        if (days >= ecoClasses[i].minDays) {
          return ecoClasses[i];
        }
      }
      return ecoClasses[0];
    }

    // Update class badge
    function updateClassBadge() {
      const newClass = getCurrentClass(completedDays);
      classBadge.textContent = `${newClass.emoji} ${newClass.name}`;
      classBadge.className = `class-badge ${newClass.className}`;
      
      // Show streak fire for 3+ days
      if (completedDays >= 3) {
        streakFire.style.display = 'inline-block';
      } else {
        streakFire.style.display = 'none';
      }
    }

    // Initialize game
    function initGame() {
      updateStats();
      updateClassBadge();
      createProgressGrid();
      
      // Check if challenge is completed
      if (completedDays >= 7) {
        showCompletionState();
      }
    }

    // Update statistics display
    function updateStats() {
      creditDisplay.textContent = credits;
      dayDisplay.textContent = currentDay;
      completedDisplay.textContent = completedDays;
    }

    // Create progress grid
    function createProgressGrid() {
      progressGrid.innerHTML = '';
      
      for (let i = 1; i <= 7; i++) {
        const dayCircle = document.createElement('div');
        dayCircle.className = 'day-circle';
        dayCircle.textContent = i;
        
        if (i <= completedDays) {
          dayCircle.classList.add('completed');
          dayCircle.innerHTML = '✓';
        } else if (i === currentDay && completedDays < 7) {
          dayCircle.classList.add('current');
        } else {
          dayCircle.classList.add('pending');
        }
        
        progressGrid.appendChild(dayCircle);
      }
    }

    // Create various celebration animations
    function createFireworks(x, y) {
      for (let i = 0; i < 8; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.animationDelay = (i * 0.1) + 's';
        
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        firework.style.background = `radial-gradient(circle, #fff, ${colors[i % colors.length]})`;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
          if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
          }
        }, 1000);
      }
    }

    function createParticleBurst(x, y) {
      const colors = ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#00CED1'];
      
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 50 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1500);
      }
    }

    function showLevelUpAnimation(newClass) {
      const levelUpDiv = document.createElement('div');
      levelUpDiv.className = 'level-up-animation';
      levelUpDiv.innerHTML = `🎉 LEVEL UP!<br>${newClass.emoji} ${newClass.name}`;
      
      document.body.appendChild(levelUpDiv);
      
      setTimeout(() => {
        if (levelUpDiv.parentNode) {
          levelUpDiv.parentNode.removeChild(levelUpDiv);
        }
      }, 3000);
    }

    // Enhanced confetti
    function createConfetti() {
      const colors = ['#4CAF50', '#45a049', '#ffd700', '#ffed4a', '#ff6b6b', '#4ecdc4', '#96CEB4', '#FFEAA7'];
      const shapes = ['circle', 'square', 'triangle'];
      
      for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
          confetti.style.borderRadius = '0';
          confetti.style.transform += ' rotate(45deg)';
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 4000);
      }
    }

    // Handle code submission with enhanced animations
    function handleCodeSubmission() {
      const code = codeInput.value.trim().toUpperCase();
      
      if (!code) {
        showFeedback('Please enter a code!', 'warning');
        return;
      }
      
      if (completedDays >= 7) {
        showFeedback('🎉 Challenge already completed! You\'re an Eco Guardian!', 'success');
        return;
      }
      
      if (validCodes.includes(code) && !usedCodes.includes(code)) {
        const oldClass = currentClass;
        
        // Valid new code
        usedCodes.push(code);
        credits += 15;
        completedDays = usedCodes.length;
        currentDay = Math.min(completedDays + 1, 7);
        currentClass = getCurrentClass(completedDays);
        
        // Save to localStorage
        localStorage.setItem('ecoMission_usedCodes', JSON.stringify(usedCodes));
        localStorage.setItem('ecoMission_credits', credits.toString());
        
        // Check for class upgrade
        const hasLeveledUp = currentClass.name !== oldClass.name;
        
        if (hasLeveledUp) {
          showFeedback(`🎊 CLASS UP! You've become a ${currentClass.name}! +15 eco credits! ✨`, 'class-up');
          showLevelUpAnimation(currentClass);
          
          // Multiple celebration effects for level up
          setTimeout(() => createFireworks(window.innerWidth / 2, window.innerHeight / 2), 200);
          setTimeout(() => createParticleBurst(window.innerWidth / 2, window.innerHeight / 2), 400);
          setTimeout(() => createConfetti(), 600);
        } else {
          showFeedback(`✅ Great job! Code accepted! +15 eco credits earned! 🌟`, 'success');
        }
        
        // Animate success
        createConfetti();
        
        // Animate the completed day circle
        setTimeout(() => {
          const dayCircles = document.querySelectorAll('.day-circle');
          if (dayCircles[completedDays - 1]) {
            dayCircles[completedDays - 1].classList.add('just-completed');
          }
        }, 100);
        
        // Update displays
        updateStats();
        updateClassBadge();
        createProgressGrid();
        
        // Clear input
        codeInput.value = '';
        
        // Check if challenge completed
        if (completedDays >= 7) {
          setTimeout(showCompletionState, 1500);
        }
        
      } else if (usedCodes.includes(code)) {
        showFeedback('⚠️ This code has already been used! Try a different one.', 'warning');
      } else {
        showFeedback('❌ Invalid code! Make sure you entered it correctly.', 'error');
      }
    }

    // Show feedback message
    function showFeedback(message, type) {
      feedback.textContent = message;
      feedback.className = `feedback ${type}`;
      
      // Auto-clear after 5 seconds
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'feedback';
      }, 5000);
    }

    // Show completion state with grand finale
    function showCompletionState() {
      achievementBadge.classList.add('show');
      submitBtn.textContent = '🏆 Challenge Complete!';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      codeInput.disabled = true;
      codeInput.placeholder = 'Challenge completed! 🎉';
      
      // Grand finale celebration sequence
      const celebrationSequence = [
        () => createFireworks(window.innerWidth * 0.2, window.innerHeight * 0.3),
        () => createFireworks(window.innerWidth * 0.8, window.innerHeight * 0.3),
        () => createParticleBurst(window.innerWidth * 0.5, window.innerHeight * 0.4),
        () => createConfetti(),
        () => createFireworks(window.innerWidth * 0.3, window.innerHeight * 0.6),
        () => createFireworks(window.innerWidth * 0.7, window.innerHeight * 0.6),
        () => createConfetti(),
        () => createParticleBurst(window.innerWidth * 0.5, window.innerHeight * 0.2)
      ];
      
      celebrationSequence.forEach((celebration, index) => {
        setTimeout(celebration, index * 500);
      });
      
      // Continuous confetti for completion
      for (let i = 0; i < 10; i++) {
        setTimeout(() => createConfetti(), i * 1000);
      }
    }

    // Reset progress function
    function resetProgress() {
      if (confirm('Are you sure you want to reset your progress? This cannot be undone!')) {
        localStorage.removeItem('ecoMission_usedCodes');
        localStorage.removeItem('ecoMission_credits');
        
        usedCodes = [];
        credits = 0;
        completedDays = 0;
        currentDay = 1;
        currentClass = getCurrentClass(0);
        
        achievementBadge.classList.remove('show');
        submitBtn.textContent = '🌱 Submit Code';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        codeInput.disabled = false;
        codeInput.placeholder = 'Enter your eco code (e.g., ECO101)';
        
        updateStats();
        updateClassBadge();
        createProgressGrid();
        showFeedback('🔄 Progress reset! Start your new EcoMission!', 'success');
      }
    }

    // Enhanced interactions
    function addInteractiveEffects() {
      // Hover effects for day circles
      document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('day-circle')) {
          if (e.target.classList.contains('completed')) {
            // Show mini celebration on hover
            const rect = e.target.getBoundingClientRect();
            createParticleBurst(rect.left + rect.width/2, rect.top + rect.height/2);
          }
        }
      });
      
      // Enhanced button interactions
      submitBtn.addEventListener('mousedown', () => {
        submitBtn.style.transform = 'translateY(-1px) scale(0.98)';
      });
      
      submitBtn.addEventListener('mouseup', () => {
        submitBtn.style.transform = 'translateY(-3px) scale(1)';
      });
      
      // Input focus effects
      codeInput.addEventListener('focus', () => {
        document.querySelector('.container').style.transform = 'scale(1.02)';
      });
      
      codeInput.addEventListener('blur', () => {
        document.querySelector('.container').style.transform = 'scale(1)';
      });
    }

    // Event listeners
    submitBtn.addEventListener('click', handleCodeSubmission);
    
    codeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleCodeSubmission();
      }
    });

    // Auto-uppercase input
    codeInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });

    // Initialize the game when page loads
    initGame();
    addInteractiveEffects();