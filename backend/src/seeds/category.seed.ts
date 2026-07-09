import { createCategory, findAllCategories } from "../services/category.service";

const categories = [
    { title: "Technology", icon: "💻", description: "Latest trends and insights in tech" },
    { title: "Programming", icon: "👨‍💻", description: "Code tutorials and software development" },
    { title: "JavaScript", icon: "🟨", description: "Everything JavaScript — vanilla to frameworks" },
    { title: "TypeScript", icon: "📘", description: "Types, generics, and advanced patterns" },
    { title: "React", icon: "⚛️", description: "Components, hooks, and React ecosystem" },
    { title: "Node.js", icon: "🟢", description: "Server-side JavaScript and APIs" },
    { title: "Python", icon: "🐍", description: "Data science, web dev, and automation" },
    { title: "DevOps", icon: "🚀", description: "CI/CD, Docker, and cloud infrastructure" },
    { title: "Design", icon: "🎨", description: "UI/UX, graphic design, and creativity" },
    { title: "Career", icon: "💼", description: "Job tips, freelancing, and growth" },
    { title: "AI & ML", icon: "🤖", description: "Artificial intelligence and machine learning" },
    { title: "Mobile Dev", icon: "📱", description: "iOS, Android, React Native, Flutter" },
    { title: "Database", icon: "🗄️", description: "SQL, NoSQL, and data modeling" },
    { title: "Security", icon: "🔒", description: "Cybersecurity and ethical hacking" },
    { title: "Open Source", icon: "🌍", description: "Contributing and community projects" },
    { title: "Testing", icon: "🧪", description: "Unit tests, E2E, and QA practices" },
    { title: "Game Dev", icon: "🎮", description: "Game engines, 3D, and interactive experiences" },
    { title: "Blockchain", icon: "⛓️", description: "Web3, smart contracts, and crypto" },
    { title: "Productivity", icon: "⚡", description: "Tools, workflows, and getting things done" },
    { title: "Writing", icon: "✍️", description: "Blogging, storytelling, and content creation" },
];

export const seedCategories = async () => {
    try {
        const result = await findAllCategories(1, 1);
        if (result.categories.length > 0) {
            console.log("📁 Categories already exist, skipping seed...");
            return;
        }

        console.log("🌱 Seeding categories...\n");

        for (let i = 0; i < categories.length; i++) {
            const { title, icon, description } = categories[i];
            await createCategory(title, icon, description);
            console.log(`✅ ${i + 1}/${categories.length} — ${icon} ${title}`);
        }

        console.log("\n🎉 Categories seeded successfully!");
    } catch (error) {
        console.error("❌ Seed categories failed:", error);
    }
};