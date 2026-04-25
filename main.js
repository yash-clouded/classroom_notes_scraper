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
̨̨
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
