RELEASE_VERSION=v$(VERSION)
GIT_BRANCH=$(strip $(shell git symbolic-ref --short HEAD))
GIT_VERSION="$(strip $(shell git rev-parse --short HEAD))"

release:
	@git config --local user.name "sunjx"
	@git config --local user.email "raymooonn@gmail.com"
	@git tag -a $(RELEASE_VERSION) -m "Release $(RELEASE_VERSION). Revision is: $(GIT_VERSION)" | true
	@git push origin $(RELEASE_VERSION) | true

delete-release:
	@echo "Delete a release on $(RELEASE_VERSION)"
	@git tag -d $(RELEASE_VERSION) | true
	@git push -f -d origin $(RELEASE_VERSION) | true

bump-version:
	@echo "Bump version..."
	@.makefiles/bump_version.sh
	@test -f "package.json" && .makefiles/bump_node_version.sh
	@test -f "blocklet.yml" && .makefiles/bump_blocklet_version.sh

create-pr:
	@echo "Creating pull request..."
	@make bump-version || true
	@git add .;git commit -a -m "bump version";git push origin $(GIT_BRANCH)
	@hub pull-request

browse-pr:
	@hub browse -- pulls
