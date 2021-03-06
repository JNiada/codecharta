package de.maibornwolff.codecharta.importer.scmlogparser.parser;

import de.maibornwolff.codecharta.model.input.Commit;
import de.maibornwolff.codecharta.model.input.VersionControlledFile;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.Collections.singleton;
import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.util.Lists.newArrayList;

public class CommitCollectorTest {

    @Test
    public void collectsCommits() {
        LocalDateTime commitDate = LocalDateTime.now();
        Commit firstCommit = new Commit("TheAuthor", newArrayList("src/Main.java", "src/Util.java"), commitDate);
        Commit secondCommit = new Commit("AnotherAuthor", newArrayList("src/Util.java"), commitDate);
        List<VersionControlledFile> commits = Stream.of(firstCommit, secondCommit).collect(CommitCollector.create());
        assertThat(commits)
                .extracting(VersionControlledFile::getFilename, VersionControlledFile::getNumberOfOccurrencesInCommits, VersionControlledFile::getAuthors)
                .containsExactly(
                        tuple("src/Main.java", 1, singleton("TheAuthor")),
                        tuple("src/Util.java", 2, new HashSet<>(asList("TheAuthor", "AnotherAuthor"))));
    }

    @Test
    public void doesNotCollectEmptyFilenames() {
        Commit commit = new Commit("TheAuthor", newArrayList(""), LocalDateTime.now());
        List<VersionControlledFile> commits = Stream.of(commit).collect(CommitCollector.create());
        assertThat(commits).isEmpty();
    }

    @Test
    public void collectsHalfEmptyFilelists() {
        Commit commit = new Commit("TheAuthor", newArrayList("", "src/Main.java"), LocalDateTime.now());
        List<VersionControlledFile> commits = Stream.of(commit).collect(CommitCollector.create());
        assertThat(commits)
                .extracting(VersionControlledFile::getFilename)
                .containsExactly("src/Main.java");
    }

    @Test
    public void doesNotSupportParallelStreams() {
        Commit commit = new Commit("TheAuthor", newArrayList("src/Main.java", "src/Util.java"), LocalDateTime.now());
        Stream<Commit> parallelCommitStream = Stream.of(commit, commit).parallel();
        assertThatThrownBy(() -> parallelCommitStream.collect(CommitCollector.create())).isInstanceOf(UnsupportedOperationException.class);
    }

}
