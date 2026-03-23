<!-- Example Use Cases & Code Snippets -->

# 📚 Example Use Cases & Advanced Features

## Table of Contents
1. [Real-World Examples](#real-world-examples)
2. [Advanced Prompt Templates](#advanced-prompt-templates)
3. [Integration Examples](#integration-examples)
4. [Extending the Application](#extending-the-application)

---

## Real-World Examples

### Example 1: Debugging a React Component

**Code to Paste:**
```jsx
function UserCard({ user }) {
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    if (isActive) {
        return (
            <div className="card">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={handleClick}>Deactivate</button>
            </div>
        );
    }
}
```

**Prompt:**
```
Find bugs in this React component and suggest fixes
```

**Why This Works:**
- The code has a clear issue (missing return statement for inactive state)
- AI can identify it and suggest the fix

---

### Example 2: Optimizing a Database Query

**Code to Paste:**
```python
def get_user_posts(user_id):
    users = User.query.all()  # Gets ALL users
    user = None
    
    for u in users:
        if u.id == user_id:
            user = u
            break
    
    if user:
        posts = Post.query.all()  # Gets ALL posts
        user_posts = []
        
        for post in posts:
            if post.user_id == user_id:
                user_posts.append(post)
        
        return user_posts
    return None
```

**Prompt:**
```
Optimize this code. It seems inefficient when there are many users and posts.
```

**Why This Works:**
- AI will suggest using proper database queries
- Recommends `.filter()` instead of loading all records
- Points out N+1 query problem

---

### Example 3: Understanding Complex Algorithm

**Code to Paste:**
```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
```

**Prompt:**
```
Explain how this quickSort algorithm works step by step
```

**Better Prompt for Learning:**
```
Explain the quickSort algorithm as if you're teaching a computer science student. 
Include:
1. What the algorithm does
2. How the partition function works
3. Why it's efficient
4. Time complexity analysis
```

---

### Example 4: Security Review

**Code to Paste:**
```python
@app.route('/user/<user_id>')
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user)

@app.route('/delete/<user_id>', methods=['POST'])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return "User deleted"
```

**Prompt:**
```
Review this code for security vulnerabilities
```

**What AI Will Find:**
- Missing authentication/authorization
- CSRF protection needed
- No input validation
- Deletions should require confirmation

---

## Advanced Prompt Templates

### Template 1: Code Review
```
Review the following [LANGUAGE] code for:
1. Code quality and readability
2. Potential bugs or edge cases
3. Performance improvements
4. Security issues
5. Best practices

Also, suggest what parts could be refactored.
```

### Template 2: Documentation
```
Generate comprehensive documentation for this function including:
- Purpose and description
- Parameters and their types
- Return value and type
- Example usage
- Error handling
- Edge cases to consider
```

### Template 3: Testing
```
Write unit test cases for this function. Include:
- Happy path tests
- Edge case tests
- Error condition tests
- Test data examples

Use [TESTING_FRAMEWORK] format.
```

### Template 4: Migration Guide
```
How would you migrate this code from [OLD_TECHNOLOGY] to [NEW_TECHNOLOGY]?
Please provide:
1. Step-by-step migration process
2. Breaking changes to watch for
3. Performance implications
4. Code examples showing before/after
```

### Template 5: Performance Analysis
```
Analyze this code for performance issues:
1. Identify bottlenecks
2. Estimate time complexity: O(?)
3. Estimate space complexity: O(?)
4. Suggest optimizations with code examples
5. What's the best vs worst case scenario?
```

---

## Integration Examples

### Integrating with Popular Tools

#### 1. With GitHub
- Copy code from GitHub files
- Paste into Code Genius
- Get analysis and suggestions
- Copy AI response back to GitHub issue/discussion

#### 2. With Stack Overflow
- Copy problematic code from Stack Overflow questions
- Get detailed explanation and solutions
- Learn from code examples in answers

#### 3. With Code Review Tools
- Use Code Genius for initial analysis
- Then use proper code review tools for team feedback
- Faster review cycles

#### 4. With Learning Platforms
- Paste code from online tutorials
- Ask AI to explain what you don't understand
- Get clarification faster than comments

---

## Extending the Application

### How to Add Features

#### Feature 1: Syntax Highlighting
Add this library to index.html:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
```

Then update script.js:
```javascript
function highlightResponseCode() {
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
}
```

#### Feature 2: Multiple Models
Modify script.js:
```javascript
const MODELS = {
    'fast': 'stepfun/step-3.5-flash:free',
    'quality': 'openai/gpt-4',
    'cheap': 'meta-llama/llama-2-70b-chat',
};

// Add model selector to UI
const modelSelect = document.getElementById('modelSelect');
const selectedModel = MODELS[modelSelect.value];
```

#### Feature 3: Code Execution
Add CodePen/JSFiddle embed capability:
```javascript
function createExecutableExample(code) {
    const encodedCode = encodeURIComponent(code);
    const fiddle = `https://jsfiddle.net/?html=${encodedCode}`;
    return fibble;
}
```

#### Feature 4: Export to File
```javascript
function exportAsFile(format) {
    const content = conversationHistory.map(msg => 
        `${msg.role}: ${msg.content}`
    ).join('\n\n---\n\n');
    
    if (format === 'md') {
        // Markdown export
    } else if (format === 'pdf') {
        // PDF export with html2pdf library
    } else if (format === 'txt') {
        // Plain text
    }
}
```

---

## Advanced Prompt Techniques

### Technique 1: Few-Shot Prompting
```
I want you to refactor code to follow this pattern.

Example:
// Before
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// After
arr.forEach(item => console.log(item));

Now refactor this code:
[YOUR CODE HERE]
```

### Technique 2: Chain-of-Thought
```
Let's think step by step about this code:

1. What does the function do?
2. What are the inputs and outputs?
3. Are there any edge cases?
4. What could go wrong?

Code:
[YOUR CODE HERE]
```

### Technique 3: Role-Based Prompting
```
Act as a senior software engineer with 20 years of experience.
Review this code and provide:
1. Critical issues that must be fixed
2. Improvements for production readiness
3. Best practices being violated

Code:
[YOUR CODE HERE]
```

---

## Performance Optimization Tips

### 1. Token Management
- Longer code = more tokens = slower response
- Break large files into functions
- Remove unnecessary whitespace

### 2. Temperature Settings
| Task | Temperature |
|------|-------------|
| Bug finding | 0.3 |
| Code review | 0.5 |
| Optimization | 0.7 |
| Refactoring | 0.9 |
| Creative code | 1.2+ |

### 3. Prompt Quality
- Be specific about what you want
- Include error messages if applicable
- Specify the language/framework
- Ask for format (bullet points, code, explanation)

---

## Troubleshooting Advanced Issues

### Issue: Poor Quality Responses
**Solutions:**
1. Be more specific in your prompt
2. Provide more context
3. Try lower temperature for consistency
4. Break code into smaller pieces

### Issue: Timeout Errors
**Solutions:**
1. Reduce max tokens
2. Break large code into chunks
3. Check internet connection
4. Try during off-peak hours

### Issue: Inconsistent Results
**Solutions:**
1. Lower temperature for consistency
2. Be more detailed in prompts
3. Provide examples of expected output
4. Use fixed seeds if available

---

## Best Practices Summary

✅ **DO:**
- Break large problems into smaller parts
- Use specific, clear language
- Provide complete code context
- Review AI suggestions for accuracy
- Ask follow-up questions for clarity

❌ **DON'T:**
- Paste secret keys or passwords
- Use for production code without review
- Rely entirely on AI suggestions
- Ask AI to write exploits or malware
- Forget to credit AI when learning

---

## Resources for Learning

### Documentation
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Tools to Use Together
- VS Code with AI extensions
- GitHub Copilot for inline suggestions
- Code review tools like Gerrit/GitHub Code Review
- Linters and formatters for code style

### Related Projects
- Cursor IDE (AI-powered editor)
- Continue.dev (IDE extension)
- ollama (Local LLMs)
- LM Studio (Local AI)

---

## Keeping Skills Sharp

1. **Review AI Output** - Don't blindly accept suggestions
2. **Understand the 'Why'** - Ask AI to explain its reasoning
3. **Test Suggestions** - Run suggested code before using
4. **Compare Approaches** - Ask for multiple solutions
5. **Learn Patterns** - Understand common patterns it suggests

---

**Remember:** AI is a tool to enhance your skills, not replace them!

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Created for:** Code Genius
