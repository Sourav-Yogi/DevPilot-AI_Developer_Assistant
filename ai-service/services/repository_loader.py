import os

class RepositoryLoader:

    def __init__(self):
        self.supported_extensions = {
            ".py",
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".java",
            ".cpp",
            ".c",
            ".h",
            ".hpp",
            ".cs",
            ".go",
            ".rs",
            ".php",
            ".html",
            ".css",
            ".scss",
            ".json",
            ".md",
            ".yml",
            ".yaml",
            ".xml",
            ".sql",
        }

        self.ignored_directories = {
            ".git",
            "node_modules",
            "dist",
            "build",
            "__pycache__",
            ".next",
            ".idea",
            ".vscode",
            "venv",
            "env",
            ".venv",
        }

    def load_repository(self, repo_path: str):
        documents = []

        for root, dirs, files in os.walk(repo_path):

            # Skip ignored directories
            dirs[:] = [
                directory
                for directory in dirs
                if directory not in self.ignored_directories
            ]

            for file in files:

                extension = os.path.splitext(file)[1].lower()

                if extension not in self.supported_extensions:
                    continue

                file_path = os.path.join(root, file)

                try:
                    with open(
                        file_path,
                        "r",
                        encoding="utf-8",
                        errors="ignore",
                    ) as f:

                        content = f.read()

                    # Skip empty files
                    if not content.strip():
                        continue

                    documents.append(
                        {
                            "path": os.path.relpath(
                                file_path,
                                repo_path,
                            ),
                            "content": content,
                            "extension": extension,
                        }
                    )

                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
                    import traceback
                    traceback.print_exc()
                    continue

        return documents