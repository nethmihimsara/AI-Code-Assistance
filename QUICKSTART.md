# 🚀 Quick Start Guide - Code Genius

## 5-Minute Setup

### Step 1: Get Your Free API Key (2 minutes)
1. Go to [openrouter.ai](https://openrouter.ai)
2. Click "Sign Up" (it's free!)
3. Create an account with email
4. Go to your dashboard
5. Find "API Keys" section
6. Create a new API key
7. Copy it (you'll need this next)

### Step 2: Open the Application
1. Open `index.html` in your web browser
2. You should see the "Code Genius" interface

### Step 3: Configure the App
1. Paste your API key in the **Configuration** section
2. Leave other settings as default for now
3. Done! ✅

## First Test

### Test with a Simple Example

**Step 1:** Paste this code in "Your Code" section:
```python
def calculate_average(numbers):
    total = 0
    for n in numbers:
        total = total + n
    return total / len(numbers)
```

**Step 2:** In "Your Prompt" section:
- Type: "Explain what this code does"
- Or click the quick action: "📝 Explain Code"

**Step 3:** Click "Send"

**Step 4:** Wait for the AI response (it usually takes 2-5 seconds)

---

## Features You Should Know About

### 🎯 Quick Actions
These preset prompts make common tasks super fast:
- **📝 Explain Code** - Understand what code does
- **🐛 Find Bugs** - Identify potential issues
- **⚡ Optimize** - Get performance tips
- **💬 Add Comments** - Add documentation

### 🌙 Dark Theme
- Click the moon icon in the top right to toggle theme
- Dark mode is enabled by default

### ⚙️ Advanced Settings
- **Temperature** (0-2): 
  - Low (0.3) = Consistent, precise responses
  - High (1.5) = Creative, varied responses
  - Default (0.7) = Balanced
  
- **Max Tokens**: Maximum length of response
  - Default is 2000 (usually enough for detailed responses)

### 💾 Auto-Save
- Your API key is saved (securely in browser)
- Your code and prompts are saved
- Your settings are remembered

---

## Common Tasks

### Task 1: Find a Bug 🐛
```
Code Section:
[Paste your problematic code]

Prompt:
"There's a bug in this code. Can you find it?"
```

### Task 2: Code Review
```
Code Section:
[Paste your code]

Prompt:
"Review this code and suggest improvements"
```

### Task 3: Learn How It Works
```
Code Section:
[Paste complex code]

Prompt:
"Explain this code line by line like I'm a beginner"
```

### Task 4: Performance Optimization
```
Code Section:
[Paste your code]

Prompt:
"How can I optimize this code for better performance?"
```

### Task 5: Write Better Code
```
Code Section:
[Paste your code]

Prompt:
"Refactor this code to be more readable and maintainable"
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Send your message |
| `Ctrl + K` | Focus on prompt input |
| `Escape` | Remove focus from current input |

---

## Tips & Tricks 💡

### 1. **Be Specific**
Instead of: "Fix this"
Try: "This function should return the average of numbers but it's giving wrong results"

### 2. **Use Code Context**
The AI needs to see your code, so always include it!

### 3. **Ask Follow-up Questions**
Previous questions are remembered, so you can ask "What about security?" without repeating context

### 4. **Adjust Temperature for Your Needs**
- Bug finding? Use low temperature (0.4)
- Refactoring ideas? Use higher temperature (1.0)

### 5. **Break Large Code Into Chunks**
If your code is very long (>1000 lines), consider sharing just the relevant function or module

---

## Common Issues & Solutions

### ❌ "Authentication failed"
✅ Solution:
- Double-check your API key is correct
- Delete any extra spaces in the API key
- Make sure your OpenRouter account is active

### ❌ "Network error"
✅ Solution:
- Check your internet connection
- Make sure OpenRouter is not down
- Refresh the page and try again

### ❌ "Request timed out"
✅ Solution:
- Try with a smaller code sample
- Reduce max tokens to 1000
- Check your internet speed

### ❌ "No response"
✅ Solution:
- Check if you've filled in all required fields:
  - API Key is entered
  - Code is pasted
  - Prompt is written
- Reload the page and try again

---

## Next Steps

Once you're comfortable with the basics:

1. **Explore Different Prompts** - Try custom prompts for your specific needs
2. **Adjust Temperature** - Find the right balance for your use case
3. **Save Conversations** - Look for export feature to save your chats
4. **Review Responses** - AI can make mistakes, always review its output

---

## Advanced Features

### Conversation History
- The AI remembers everything in your current session
- You can ask follow-up questions naturally
- Context is automatically passed to the AI
- Refresh the page to start fresh

### Code Formatting
The AI response supports:
- **Bold text** for emphasis
- `Code highlighting` for snippets
- ```code blocks``` for full functions
- Lists and numbered items

### Copy Responses
You can:
- Select and copy any response text
- Copy code blocks with one click
- Export full conversations as JSON

---

## Best Practices

✅ **DO:**
- Paste complete, runnable code
- Be clear about what you want
- Share error messages if applicable
- Ask for explanations you don't understand

❌ **DON'T:**
- Paste your real passwords or secrets
- Share sensitive customer data
- Expect perfect answers (review code)
- Use outdated or proprietary code without context

---

## Getting Help

1. **Check Browser Console** (F12 → Console tab)
   - Look for error messages
   - Copy and share these if asking for help

2. **Review OpenRouter Docs**
   - https://openrouter.ai/docs
   - Check if the model is working

3. **Check Network Tab** (F12 → Network)
   - Verify API requests are being sent
   - Check response status codes

---

## What's Next?

Great job! You now know how to use Code Genius. Here are some things you can do:

1. **Code Analysis**: Analyze real code from your projects
2. **Learning**: Use it to understand how code works
3. **Debugging**: Find and fix bugs faster
4. **Refactoring**: Improve code quality
5. **Documentation**: Generate helpful comments

---

**Happy coding! 🎉**

For more details, see [README.md](README.md)

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Model:** stepfun/step-3.5-flash:free (Free to use!)
