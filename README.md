📥 Google Classroom Material Downloader

A browser-based JavaScript tool to extract and download all materials from the Google Classroom Classwork section with deduplication, filtering, and retry support.

The code is in Main.js

⸻

🚀 Features
	•	🔍 Scans entire Classwork (handles lazy loading)
	•	📂 Automatically expands all assignments
	•	🔗 Extracts all material links (Google Drive + external)
	•	🧹 Removes duplicate files
	•	🎯 Interactive download options:
	•	Download all files
	•	Only Google Drive files
	•	Only external links
	•	Custom selection
	•	🔁 Retry failed downloads
	•	⚡ Runs directly in browser console (no installation required)

⸻

🛠 Project Structure
/project-root
│── README.md
│── main.js   ← core script


⸻

▶️ Usage
	1.	Open Google Classroom
	2.	Navigate to Classwork
	3.	Open Developer Console (F12)
	4.	Copy code from main.js
	5.	Paste it into console and press Enter

⸻

🎯 Commands

After running the script:
choice("all")      // Download everything
choice("gdrive")   // Only Google Drive files
choice("other")    // Only external links
choice("custom")   // Manual selection

🧩 Custom Selection
choice("custom")
customSelect([0, 2, 5])

🔁 Retry Failed Downloads
retry()


⸻

⚠️ Limitations
	•	Requires access permission to files
	•	Some Google Docs may require “Make a copy”
	•	Browser popup blocker must be disabled
	•	Cannot perfectly detect all failed downloads (browser limitation)

⸻

💡 Tips
	•	Zoom out page to load more items faster
	•	Run script twice for maximum coverage
	•	Allow popups for smoother downloads

⸻

🧠 Tech Stack
	•	Vanilla JavaScript
	•	DOM traversal
	•	Async/await for flow control
	•	Set-based deduplication

⸻

📌 Disclaimer

This tool is intended for personal and educational use only.
Please respect content ownership and permissions.

⸻

⭐ Future Improvements
	•	ZIP download support
	•	File-type filtering (PDF, video, etc.)
	•	Export links to CSV
	•	Background download queue

⸻

🤝 Contributing

Pull requests and improvements are welcome.
