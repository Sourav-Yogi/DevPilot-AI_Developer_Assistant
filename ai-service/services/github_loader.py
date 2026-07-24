import os
import shutil
import stat

from git import Repo


class GitHubLoader:

    def __init__(self):
        self.base_path = "./data/repos"

        os.makedirs(self.base_path, exist_ok=True)

    def _remove_readonly(self, func, path, exc_info):
        """
        Fix for Windows: remove read-only files while deleting folders.
        """
        os.chmod(path, stat.S_IWRITE)
        func(path)

    def clone_repository(self, project_id: str, github_url: str) -> str:

        repo_path = os.path.join(self.base_path, project_id)

        # Delete existing repository (re-index support)
        if os.path.exists(repo_path):
            shutil.rmtree(
                repo_path,
                onerror=self._remove_readonly
            )

        # Clone latest repository
        Repo.clone_from(
            github_url,
            repo_path
        )

        return repo_path