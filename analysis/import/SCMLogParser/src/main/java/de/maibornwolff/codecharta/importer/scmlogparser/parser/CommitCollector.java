package de.maibornwolff.codecharta.importer.scmlogparser.parser;

import de.maibornwolff.codecharta.model.input.Commit;
import de.maibornwolff.codecharta.model.input.VersionControlledFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;

class CommitCollector {

    static Collector<Commit, ?, List<VersionControlledFile>> create() {
        CommitCollector collector = new CommitCollector();
        return Collector.of(ArrayList::new, collector::collectCommit, collector::combineForParallelExecution);
    }

    private void collectCommit(List<VersionControlledFile> versionControlledFiles, Commit commit) {
        removeEmptyFiles(commit);
        if (isEmpty(commit)) {
            return;
        }
        addYetUnknownFilesToVersionControlledFiles(versionControlledFiles, commit.getFilenames());
        addCommitMetadataToMatchingVersionControlledFiles(commit, versionControlledFiles);
    }

    private void removeEmptyFiles(Commit commit) {
        commit.getFilenames().removeIf(String::isEmpty);
    }

    private boolean isEmpty(Commit commit) {
        return commit.getFilenames().isEmpty();
    }

    private void addYetUnknownFilesToVersionControlledFiles(List<VersionControlledFile> versionControlledFiles, List<String> filenamesOfCommit) {
        filenamesOfCommit.stream()
            .filter(filename -> !versionControlledFilesContainsFile(versionControlledFiles, filename))
            .forEach(unknownFilename-> addYetUnknownFile(versionControlledFiles, unknownFilename));
    }

    private boolean versionControlledFilesContainsFile(List<VersionControlledFile> versionControlledFiles, String filename) {
        return findVersionControlledFileByFilename(versionControlledFiles, filename).isPresent();
    }

    private Optional<VersionControlledFile> findVersionControlledFileByFilename(List<VersionControlledFile> versionControlledFiles, String filename) {
        return versionControlledFiles.stream()
            .filter(commit -> commit.getFilename().equals(filename))
            .findFirst();
    }

    private boolean addYetUnknownFile(List<VersionControlledFile> versionControlledFiles, String filenameOfYetUnversionedFile) {
        VersionControlledFile missingVersionControlledFile = new VersionControlledFile(filenameOfYetUnversionedFile);
        return versionControlledFiles.add(missingVersionControlledFile);
    }

    private void addCommitMetadataToMatchingVersionControlledFiles(Commit commit, List<VersionControlledFile> versionControlledFiles) {
        commit.getFilenames().stream()
                .map(file -> findVersionControlledFileByFilename(versionControlledFiles, file))
                .filter(Optional::isPresent)
                .forEach(vcFile -> vcFile.get().registerCommit(commit));

    }

    private List<VersionControlledFile> combineForParallelExecution(List<VersionControlledFile> firstCommits, List<VersionControlledFile> secondCommits) {
        throw new UnsupportedOperationException("parallel collection of commits not supported");
    }

}
