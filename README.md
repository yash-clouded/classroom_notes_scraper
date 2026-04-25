📥 Google Classroom Material Downloader

A browser-based JavaScript tool to extract and download all materials from the Google Classroom Classwork section with deduplication, filtering, and retry support.

⸻

🚀 Features
	•	🔍 Scans entire Classwork (handles lazy loading)
	•	📂 Automatically expands all assignments
	•	🔗 Extracts all material links (Drive + external)
	•	🧹 Removes duplicate files
	•	🎯 Interactive download options:
	•	Download all files
	•	Only Google Drive files
	•	Only external links
	•	Custom selection
	•	🔁 Retry failed downloads
	•	⚡ Runs directly in browser console (no setup required)

⸻

🛠 How It Works

The script:
	1.	Scrolls through the entire Classwork page
	2.	Expands all assignments
	3.	Collects all links
	4.	Deduplicates them
	5.	Lets you choose what to download

⸻

▶️ Usage
	1.	Open Google Classroom
	2.	Go to Classwork
	3.	Open Developer Console (F12)
	4.	Paste the script below
	5.	Press Enter

⸻

🎯 Commands

.After running:
choice("all")
choice("gdrive")
choice("other")
choice("custom")

.🧩 Custom Selection
choice("custom")
customSelect([0, 2, 5])


🔁 Retry Failed Downloads
retry()

💻 Full Script
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// Scroll entire page
const scrollToBottom = async () => {
	let lastHeight = 0
	while (true) {
		window.scrollTo(0, document.body.scrollHeight)
		await sleep(1500)
		const newHeight = document.body.scrollHeight
		if (newHeight === lastHeight) break
		lastHeight = newHeight
	}
}

// Open all classwork items
const openAllItems = async () => {
	const items = Array.from(document.querySelectorAll('[role="listitem"]'))
	for (const item of items) {
		item.click()
		await sleep(800)
	}
}

// Get all links
const getAllLinks = () => {
	return Array.from(document.querySelectorAll('a[href]'))
		.map(a => a.href.split('?')[0])
		.filter(Boolean)
}

// Separate links
const extractLinks = (links) => {
	const gdrive = []
	const other = []

	for (const link of links) {
		if (link.includes('drive.google.com')) gdrive.push(link)
		else if (!link.includes('classroom.google.com')) other.push(link)
	}

	return {
		gdrive: [...new Set(gdrive)],
		other: [...new Set(other)]
	}
}

// Extract Drive ID
const extractId = (url) => {
	const match = url.match(/\/d\/(.*?)\//)
	return match ? match[1] : null
}

// Create download link
const createDownloadLink = (id) =>
	`https://drive.google.com/uc?export=download&id=${id}`

// Download engine
let failedDownloads = []

const downloadLinks = async (links) => {
	failedDownloads = []

	for (const link of links) {
		try {
			console.log("⬇️", link)
			window.open(link)
			await sleep(1200)
		} catch (e) {
			failedDownloads.push(link)
		}
	}
}

// MAIN
const run = async () => {
	console.log("📜 Loading page...")
	await scrollToBottom()

	console.log("📂 Opening items...")
	await openAllItems()
	await sleep(2000)

	const links = getAllLinks()
	const { gdrive, other } = extractLinks(links)

	const gdriveDownloads = gdrive
		.map(extractId)
		.filter(Boolean)
		.map(createDownloadLink)

	console.log("\n📊 SUMMARY:")
	console.log("Drive files:", gdriveDownloads.length)
	console.log("Other links:", other.length)

	console.log(`
Choose:
choice("all")
choice("gdrive")
choice("other")
choice("custom")
`)

	window.choice = async (type) => {
		if (type === "all") {
			await downloadLinks([...gdriveDownloads, ...other])
		}
		else if (type === "gdrive") {
			await downloadLinks(gdriveDownloads)
		}
		else if (type === "other") {
			await downloadLinks(other)
		}
		else if (type === "custom") {
			console.log("Use customSelect([index])")
			window.customList = [...gdriveDownloads, ...other]

			window.customSelect = async (indexes) => {
				const selected = indexes.map(i => window.customList[i])
				await downloadLinks(selected)
			}
		}

		console.log("\n❌ Failed downloads:")
		console.log(failedDownloads)

		console.log("Type retry() to retry failed ones")

		window.retry = async () => {
			if (failedDownloads.length === 0) {
				console.log("No failed downloads 🎉")
				return
			}
			await downloadLinks(failedDownloads)
		}
	}
}

run()


⸻

⚠️ Limitations
	•	Requires file access permissions
	•	Some Google Docs require manual copy
	•	Browser popup blocker must be disabled
	•	Cannot fully guarantee failure detection

⸻

📌 Disclaimer

For educational use only. Respect content ownership.

⸻

⭐ Future Improvements
	•	ZIP download
	•	File-type filters
	•	CSV export
	•	Background queue

⸻

🤝 Contributing

PRs welcome.
