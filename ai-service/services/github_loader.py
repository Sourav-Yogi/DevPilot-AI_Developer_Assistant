import tempfile

from git import Repo


class GitHubLoader:
    def clone_repository(self, github_url: str) -> str:
        """
        Clone the GitHub repository into a temporary directory.

        The caller is responsible for deleting this directory
        after indexing is complete.
        """

        repo_path = tempfile.mkdtemp(prefix="devpilot_")

        Repo.clone_from(
            github_url,
            repo_path,
        )

        return repo_path