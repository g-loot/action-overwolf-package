# Overwolf package action

## Usage

### Inputs

- `path`: The local path to root folder of your Overwolf app.

### Outputs

- `zippath`: Path to the generated Overwolf opk.
- `zipname`: The name of the generated Overwolf opk.

### Sample workflow.yml snippet
```
      - name: Bump version and push tag
        id: version_bump
        uses: anothrNick/github-tag-action@1.34.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          DEFAULT_BUMP: "patch"
          RELEASE_BRANCHES: "master"
      - name: Create Release
        id: create_release
        uses: actions/create-release@latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.version_bump.outputs.tag }}
          release_name: Release ${{ steps.version_bump.outputs.tag }}
          draft: false
          prerelease: false
      - name: Create opk package
        id: opk
        uses: g-loot/action-overwolf-package@master
        with:
          path: app
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ${{ steps.opk.outputs.zippath }} 
          asset_name: ${{ steps.opk.outputs.zipname }}
          asset_content_type: application/zip
```
