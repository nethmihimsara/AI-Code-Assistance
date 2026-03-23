// Configuration
const CONFIG = {
    apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'stepfun/step-3.5-flash:free',
    defaultMaxTokens: 2000,
};

// State management
let conversationHistory = [];
let isLoading = false;

// DOM Elements - initialized after DOM loads
let apiKeyInput, temperatureInput, tempValueDisplay, maxTokensInput;
let codeInput, promptInput, sendBtn, responseContainer, loadingIndicator, themeIcon;

function initDOMElements() {
    apiKeyInput = document.getElementById('apiKey');
    temperatureInput = document.getElementById('temperature');
    tempValueDisplay = document.getElementById('tempValue');
    maxTokensInput = document.getElementById('maxTokens');
    codeInput = document.getElementById('codeInput');
    promptInput = document.getElementById('promptInput');
    sendBtn = document.getElementById('sendBtn');
    responseContainer = document.getElementById('responseContainer');
    loadingIndicator = document.getElementById('loadingIndicator');
    themeIcon = document.getElementById('themeIcon');

    // Event Listeners
    temperatureInput.addEventListener('input', (e) => {
        tempValueDisplay.textContent = parseFloat(e.target.value).toFixed(1);
    });

    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendMessage();
        }
    });

    // Save API key to localStorage
    apiKeyInput.addEventListener('change', (e) => {
        localStorage.setItem('openrouterApiKey', e.target.value);
    });

    // Handle paste events for code input
    codeInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const code = codeInput.value;
            const tokenCount = estimateTokenCount(code);
            console.log(`Code pasted. Approximate tokens: ${tokenCount}`);
        }, 10);
    });

    // Auto-save functionality
    let autoSaveTimer;
    [apiKeyInput, temperatureInput, maxTokensInput, codeInput, promptInput].forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                const state = {
                    temperature: temperatureInput.value,
                    maxTokens: maxTokensInput.value,
                    code: codeInput.value,
                    prompt: promptInput.value,
                };
                localStorage.setItem('appState', JSON.stringify(state));
            }, 1000);
        });
    });
}

// Theme Toggle
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIconEl = document.getElementById('themeIcon');
    if (!themeIconEl) return;
    const isDark = document.documentElement.classList.contains('dark');
    themeIconEl.innerHTML = isDark
        ? '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>'
        : '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>';
}

// Initialize theme from localStorage
function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon();
}

// Restore saved API key
function restoreApiKey() {
    const apiKeyEl = document.getElementById('apiKey');
    if (!apiKeyEl) return;
    const savedKey = localStorage.getItem('openrouterApiKey');
    if (savedKey) {
        apiKeyEl.value = savedKey;
    }
}

// Set prompt from quick actions
function setPrompt(prompt) {
    const promptInputEl = document.getElementById('promptInput');
    if (promptInputEl) {
        promptInputEl.value = prompt;
        promptInputEl.focus();
    }
}

// Validate inputs
function validateInputs() {
    const apiKey = apiKeyInput.value.trim();
    const code = codeInput.value.trim();
    const prompt = promptInput.value.trim();

    if (!apiKey) {
        showError('Please enter your OpenRouter API key');
        return false;
    }

    if (!code) {
        showError('Please paste some code to analyze');
        return false;
    }

    if (!prompt) {
        showError('Please enter a prompt or select a quick action');
        return false;
    }

    return true;
}

// Show error message
function showError(message) {
    const container = document.getElementById('responseContainer');
    if (!container) return;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'response-message error slide-in-right';
    errorDiv.innerHTML = `
        <div class="flex items-start space-x-2">
            <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-red-200">${message}</span>
        </div>
    `;
    container.appendChild(errorDiv);
    container.scrollTop = container.scrollHeight;
}

// Show success message
function showSuccess(message) {
    const container = document.getElementById('responseContainer');
    if (!container) return;
    const successDiv = document.createElement('div');
    successDiv.className = 'response-message success slide-in-right';
    successDiv.innerHTML = `
        <div class="flex items-start space-x-2">
            <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-green-200">${message}</span>
        </div>
    `;
    container.appendChild(successDiv);
    container.scrollTop = container.scrollHeight;
}

// Format response with syntax highlighting style
function formatResponse(text) {
    let formatted = text;

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-300">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>');

    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
        return `<pre class="bg-dark-input rounded p-3 my-2 overflow-x-auto text-sm"><code class="text-green-300">${escapeHtml(code.trim())}</code></pre>`;
    });

    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-dark-input px-2 py-1 rounded text-sm text-yellow-300">$1</code>');

    formatted = formatted.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold text-blue-400 mt-3 mb-2">$1</h3>');
    formatted = formatted.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-blue-400 mt-4 mb-2">$1</h2>');
    formatted = formatted.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold text-blue-400 mt-4 mb-2">$1</h1>');

    formatted = formatted.replace(/^\- (.*?)$/gm, '<li class="ml-4 text-gray-300">$1</li>');

    formatted = formatted.replace(/\n\n/g, '</p><p class="mb-2">');
    formatted = `<p class="mb-2">${formatted}</p>`;

    return formatted;
}

// Escape HTML
function escapeHtml(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

// Main send message function
async function sendMessage() {
    if (!validateInputs()) return;

    if (isLoading) {
        showError('Please wait for the previous response to finish');
        return;
    }

    const apiKey = apiKeyInput.value.trim();
    const code = codeInput.value.trim();
    const prompt = promptInput.value.trim();
    const temperature = parseFloat(temperatureInput.value);
    const maxTokens = parseInt(maxTokensInput.value) || CONFIG.defaultMaxTokens;

    isLoading = true;
    sendBtn.disabled = true;
    sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
    loadingIndicator.classList.remove('hidden');

    if (responseContainer.querySelector('.text-gray-400.text-center')) {
        responseContainer.innerHTML = '';
    }

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'response-message slide-in-left';
    userMessageDiv.innerHTML = `
        <div class="flex items-start space-x-2">
            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">U</div>
            <div class="flex-1">
                <p class="font-semibold text-blue-300 mb-1">You</p>
                <p class="text-gray-300 text-sm mb-2">${escapeHtml(prompt)}</p>
                <details class="text-xs text-gray-500 cursor-pointer">
                    <summary>View code</summary>
                    <pre class="mt-2 bg-dark-input rounded p-2 overflow-x-auto text-xs"><code>${escapeHtml(code)}</code></pre>
                </details>
            </div>
        </div>
    `;
    responseContainer.appendChild(userMessageDiv);

    const userMessage = {
        role: 'user',
        content: `Please analyze the following code and help with the request:\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nRequest: ${prompt}`
    };

    conversationHistory.push(userMessage);

    try {
        const requestBody = {
            model: CONFIG.model,
            messages: conversationHistory,
            temperature: temperature,
            max_tokens: maxTokens,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'response-message slide-in-right';
        aiMessageDiv.innerHTML = `
            <div class="flex items-start space-x-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">AI</div>
                <div class="flex-1">
                    <p class="font-semibold text-purple-300 mb-1">Code Genius</p>
                    <div class="text-gray-300 text-sm prose prose-invert max-w-none">
                        ${formatResponse(assistantMessage)}
                    </div>
                </div>
            </div>
        `;
        responseContainer.appendChild(aiMessageDiv);

        showSuccess('Response received successfully');
        promptInput.value = '';
        responseContainer.scrollTop = responseContainer.scrollHeight;

    } catch (error) {
        console.error('Error:', error);
        userMessageDiv.remove();

        let errorMessage = 'Failed to get response from AI';
        if (error.name === 'AbortError') {
            errorMessage = 'Request timed out. Please try again.';
        } else if (error.message.includes('API Error')) {
            errorMessage = error.message;
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error. Please check your connection and API key.';
        } else {
            errorMessage = `Error: ${error.message}`;
        }

        showError(errorMessage);

        if (conversationHistory[conversationHistory.length - 1]?.role === 'user') {
            conversationHistory.pop();
        }

    } finally {
        isLoading = false;
        sendBtn.disabled = false;
        sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        loadingIndicator.classList.add('hidden');
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Copied to clipboard!');
    }).catch(() => {
        showError('Failed to copy to clipboard');
    });
}

// Clear conversation
function clearConversation() {
    conversationHistory = [];
    const container = document.getElementById('responseContainer');
    if (container) {
        container.innerHTML = '<div class="text-gray-400 text-center py-8">Send a prompt to get started...</div>';
    }
    const codeEl = document.getElementById('codeInput');
    const promptEl = document.getElementById('promptInput');
    if (codeEl) codeEl.value = '';
    if (promptEl) promptEl.value = '';
}

// Export conversation
function exportConversation() {
    if (conversationHistory.length === 0) {
        showError('No conversation to export');
        return;
    }

    const exportData = {
        timestamp: new Date().toISOString(),
        model: CONFIG.model,
        conversation: conversationHistory,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showSuccess('Conversation exported successfully');
}

// Token counter (approximate)
function estimateTokenCount(text) {
    return Math.ceil(text.length / 4);
}

// Restore state from localStorage
function restoreAppState() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            const tempEl = document.getElementById('temperature');
            const maxTokEl = document.getElementById('maxTokens');
            const codeEl = document.getElementById('codeInput');
            const promptEl = document.getElementById('promptInput');
            const tempValEl = document.getElementById('tempValue');

            if (state.temperature && tempEl) tempEl.value = state.temperature;
            if (state.maxTokens && maxTokEl) maxTokEl.value = state.maxTokens;
            if (state.code && codeEl) codeEl.value = state.code;
            if (state.prompt && promptEl) promptEl.value = state.prompt;
            if (tempValEl && tempEl) tempValEl.textContent = parseFloat(tempEl.value).toFixed(1);
        } catch (e) {
            console.log('Could not restore app state');
        }
    }
}

// Initialize application
function initApp() {
    console.log('Initializing Code Genius...');
    initDOMElements();
    initTheme();
    restoreApiKey();
    restoreAppState();
}

// Run initialization on page load
document.addEventListener('DOMContentLoaded', initApp);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const promptEl = document.getElementById('promptInput');
        if (promptEl) promptEl.focus();
    }
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// System dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('theme')) {
        document.documentElement.classList.add('dark');
    }
}

// Global error handlers
window.addEventListener('error', (e) => {
    console.error('Unhandled error:', e);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e);
});