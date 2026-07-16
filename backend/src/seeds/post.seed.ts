import { Post } from "../models/post.model";
import { Category } from "../models/category.model";
import { User } from "../models/user.model";
import { createPost } from "../services/post.service";
import { findAllPosts } from "../services/post.service";
import { UserRole } from "../types/user.types";

import { SortOption } from "../types/sort.types";
import { PostStatus } from "../types/post.types";

const posts = [
    {
        title: "Getting Started with React 19: A Comprehensive Guide",
        content: `<h2>Why React 19 Matters</h2><p>React 19 brings <strong>exciting new features</strong> that every developer should know about. The team has focused on improving performance, developer experience, and enabling new patterns that were previously impossible.</p><blockquote><p>"React 19 is not just an incremental update — it's a fundamental shift in how we think about React applications." — <em>React Core Team</em></p></blockquote><h2>Server Components</h2><p>One of the biggest additions is <strong>Server Components</strong>. They allow you to render components on the server, reducing the JavaScript bundle sent to the client significantly.</p><p>Here's what makes them special:</p><ul><li><strong>Zero client-side JavaScript</strong> for static content</li><li>Direct access to backend resources (databases, filesystem)</li><li>Automatic code splitting without manual configuration</li><li>Seamless integration with Client Components</li></ul><h3>Example: A Server Component</h3><pre><code>async function BlogPosts() {\n  const posts = await db.query('SELECT * FROM posts');\n  return (\n    &lt;ul&gt;\n      {posts.map(post => &lt;li key={post.id}&gt;{post.title}&lt;/li&gt;)}\n    &lt;/ul&gt;\n  );\n}</code></pre><h2>The New Actions API</h2><p>The new <code>useActionState</code> and <code>useFormStatus</code> hooks make form handling <em>much simpler</em>. No more manual pending states or error handling boilerplate.</p><h2>Performance Improvements</h2><p>The new compiler in React 19 <strong>automatically memoizes</strong> your components.</p><p>React 19 is a <strong>massive step forward</strong> for the ecosystem. Start experimenting today!</p>`,
        categoryTitles: ["Programming", "React"],
        coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&h=400&fit=crop",
    },
    {
        title: "10 Node.js Security Best Practices You Need to Know",
        content: `<h2>Why Security Matters</h2><p>Node.js powers thousands of production applications. But with great power comes great responsibility. Here are <strong>10 essential practices</strong> to secure your applications.</p><h3>1. Keep Dependencies Updated</h3><p>Run <code>npm audit</code> regularly and use tools like <strong>Dependabot</strong> or <strong>Snyk</strong> to automatically detect vulnerabilities.</p><pre><code>npm audit fix\nnpx snyk test</code></pre><h3>2. Use Helmet.js</h3><p>Helmet sets various HTTP headers to protect your app from well-known web vulnerabilities.</p><pre><code>const helmet = require('helmet');\napp.use(helmet());</code></pre><h3>3. Implement Rate Limiting</h3><p>Prevent brute-force attacks by limiting repeated requests to your API.</p><pre><code>const rateLimit = require('express-rate-limit');\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});\napp.use('/api/', limiter);</code></pre><h3>4. Validate Input</h3><p>Never trust user input. Use <strong>Joi</strong> or <strong>Zod</strong> for validation.</p><h3>5. Use Environment Variables</h3><p>Store secrets in <code>.env</code> files. Never commit them to version control.</p><blockquote><p>"Security is not a product, but a process." — Bruce Schneier</p></blockquote><p>Implement these practices today and make your Node.js applications <strong>significantly more secure</strong>.</p>`,
        categoryTitles: ["Programming", "Security"],
        coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=400&fit=crop",
    },
    {
        title: "Advanced TypeScript Patterns Every Developer Should Master",
        content: `<h2>Level Up Your TypeScript</h2><p>TypeScript has become the standard for large-scale JavaScript applications. Here are <strong>advanced patterns</strong> that will make your code safer and more expressive.</p><h3>1. Discriminated Unions</h3><pre><code>type Success = { status: 'success'; data: User };\ntype Error = { status: 'error'; message: string };\ntype Result = Success | Error;\n\nfunction handleResult(result: Result) {\n  if (result.status === 'success') {\n    console.log(result.data);\n  }\n}</code></pre><h3>2. Template Literal Types</h3><pre><code>type EventName = \`on\${Capitalize&lt;string&gt;}\`;\ntype ClickEvent = 'onClick';\ntype HoverEvent = 'onHover';</code></pre><h3>3. Conditional Types</h3><pre><code>type IsString&lt;T&gt; = T extends string ? true : false;\ntype A = IsString&lt;'hello'&gt;; // true\ntype B = IsString&lt;42&gt;; // false</code></pre><h3>4. Mapped Types with Key Remapping</h3><pre><code>type Getters&lt;T&gt; = {\n  [K in keyof T as \`get\${Capitalize&lt;string & K&gt;}\`]: () => T[K]\n};</code></pre><p>Master these patterns and <strong>write safer, more maintainable code</strong> with TypeScript.</p>`,
        categoryTitles: ["TypeScript", "Programming"],
        coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=400&fit=crop",
    },
    {
        title: "CSS Grid Layout: The Complete Visual Guide",
        content: `<h2>Why CSS Grid?</h2><p>CSS Grid is the <strong>most powerful layout system</strong> in CSS. It's a 2-dimensional system that can handle both columns and rows.</p><h3>Basic Grid</h3><pre><code>.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}</code></pre><h3>Grid Areas</h3><pre><code>.container {\n  grid-template-areas:\n    "header header header"\n    "sidebar main main"\n    "footer footer footer";\n}\n\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }\n.footer { grid-area: footer; }</code></pre><blockquote><p>"CSS Grid is the future of web layout. Learn it now."</p></blockquote><h3>Responsive Without Media Queries</h3><pre><code>.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}</code></pre><p>Start using CSS Grid today and <strong>simplify your layouts</strong> dramatically.</p>`,
        categoryTitles: ["Design", "JavaScript"],
        coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=400&fit=crop",
    },
    {
        title: "How to Land Your First Developer Job in 2025",
        content: `<h2>The Developer Job Market in 2025</h2><p>Breaking into tech can feel overwhelming. Here's a <strong>proven roadmap</strong> to land your first developer job.</p><h3>1. Build Real Projects</h3><p>Employers want to see <strong>working applications</strong>, not just tutorial code. Build something that solves a real problem.</p><h3>2. Contribute to Open Source</h3><p>Open source contributions show you can work with existing codebases and collaborate with others.</p><h3>3. Master the Fundamentals</h3><ul><li>Data structures and algorithms</li><li>Version control (Git)</li><li>Testing and debugging</li><li>System design basics</li></ul><blockquote><p>"Your portfolio is more important than your resume."</p></blockquote><h3>4. Network Effectively</h3><p>Attend meetups, join Discord communities, and connect with developers on LinkedIn and Twitter.</p><h3>5. Prepare for Interviews</h3><p>Practice coding challenges on <strong>LeetCode</strong>, do mock interviews, and study behavioral questions.</p><p>Landing your first job takes time, but with <strong>persistence and the right strategy</strong>, you'll get there!</p>`,
        categoryTitles: ["Career", "Technology"],
        coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
    },
    {
        title: "Docker for Beginners: From Zero to Container",
        content: `<h2>What is Docker?</h2><p>Docker is a platform for <strong>developing, shipping, and running applications</strong> in containers. Containers are lightweight, portable, and consistent across environments.</p><h3>Why Use Docker?</h3><ul><li><strong>Consistency:</strong> "It works on my machine" becomes a thing of the past</li><li><strong>Isolation:</strong> Each container runs independently</li><li><strong>Scalability:</strong> Easily scale services up or down</li></ul><h3>Your First Dockerfile</h3><pre><code>FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]</code></pre><h3>Docker Compose</h3><pre><code>version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: mongo:7\n    volumes:\n      - mongodb_data:/data/db</code></pre><p>Start containerizing your applications today and <strong>simplify your deployment workflow</strong>.</p>`,
        categoryTitles: ["DevOps", "Technology"],
        coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=400&fit=crop",
    },
];

export const seedPosts = async () => {
    try {
        const existingPosts = await findAllPosts(SortOption.NEWEST, "all", 1, 1);
        if (existingPosts.total > 0) {
            console.log("📝 Posts already exist, skipping seed...");
            return;
        }

        const adminUser = await User.findOne({ role: UserRole.ADMIN });
        if (!adminUser) {
            console.log("❌ No admin user found. Run seedAdmin first.");
            return;
        }

        console.log("🌱 Seeding posts...\n");

        for (let i = 0; i < posts.length; i++) {
            const { categoryTitles, ...postData } = posts[i];

            const categories = await Category.find({ title: { $in: categoryTitles } });
            const categoryIds = categories.map((cat) => cat._id.toString());

            await createPost(
                postData.title,
                postData.coverImage,
                postData.content,
                adminUser._id.toString(),
                categoryIds,PostStatus.PUBLISHED
            );

            console.log(`✅ ${i + 1}/${posts.length} — "${postData.title}"`);
        }

        console.log("\n🎉 Posts seeded successfully!");
    } catch (error) {
        console.error("❌ Seed posts failed:", error);
    }
};