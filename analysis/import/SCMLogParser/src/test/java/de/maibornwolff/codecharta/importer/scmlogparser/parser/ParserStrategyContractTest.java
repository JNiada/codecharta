package de.maibornwolff.codecharta.importer.scmlogparser.parser;

import de.maibornwolff.codecharta.model.input.Commit;
import de.maibornwolff.codecharta.model.input.VersionControlledFile;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.Collections.singleton;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

public abstract class ParserStrategyContractTest {

    /**
     * This method should return test data for the contract test. <br><br>
     * Must return a List of String representing a normal/default commit of the underlying SCM System
     * We assume that a commit can be represented as a list of Strings containing all necessary
     * informations a LogParserStrategy can extract.<br>
     * The test data set should contain a parsable author "TheAuthor", a parsable date with the
     * localDateTime "LocalDateTime.of(2017, 5, 9, 19, 57, 57)" (Tue May 9 19:57:57 2017) and three files of the commit
     * whereby one filename is duplicated; "src/Main.java","src/Main.java","src/Util.java"
     *
     * @return the test data as a List<String>
     */
    protected abstract List<String> getFullCommit();

    protected abstract LogParserStrategy getLogParserStrategy();

    protected abstract Stream<String> getTwoCommitsAsStraem();

    @Test
    public void parsesCommit() {
        LogParser logParser = new LogParser(getLogParserStrategy());
        Commit commit = logParser.parseCommit(getFullCommit());
        assertThat(commit)
                .extracting(Commit::getAuthor, Commit::getFilenames, Commit::getCommitDate)
                .containsExactly("TheAuthor", asList("src/Main.java", "src/Main.java", "src/Util.java"), LocalDateTime.of(2017, 5, 9, 19, 57, 57));
    }

    @Test
    public void parsesFilesInCommitLines() {
        List<String> filenames = getLogParserStrategy().parseFilenames(getFullCommit());
        assertThat(filenames).hasSize(3);
        assertThat(filenames).containsExactlyInAnyOrder("src/Main.java", "src/Main.java", "src/Util.java");
    }

    @Test
    public void parseAuthorFromCommitLines() {
        String author = getLogParserStrategy().parseAuthor(getFullCommit()).get();
        assertThat(author).isEqualTo("TheAuthor");
    }

    @Test
    public void parseDateFromCommitLines() {
        LocalDateTime commitDate = getLogParserStrategy().parseDate(getFullCommit()).get();
        assertThat(commitDate).isEqualToIgnoringNanos(LocalDateTime.of(2017, 5, 9, 19, 57, 57));
    }

    @Test
    public void canProvidesAnAproppriateLogLineCollectorToSeparateCommits() throws Exception {
        Stream<List<String>> commits = getTwoCommitsAsStraem().collect(getLogParserStrategy().createLogLineCollector());
        assertThat(commits).hasSize(2);
    }


    @Test
    public void accumulatesCommitFiles() {
        Stream<String> logLines = Stream.concat(getFullCommit().stream(), getFullCommit().stream());
        List<VersionControlledFile> files = new LogParser(getLogParserStrategy()).parseLoglines(logLines);
        assertThat(files)
                .extracting(VersionControlledFile::getFilename, VersionControlledFile::getNumberOfOccurrencesInCommits, VersionControlledFile::getAuthors)
                .containsExactlyInAnyOrder(
                        tuple("src/Util.java", 2, singleton("TheAuthor")),
                        tuple("src/Main.java", 4, singleton("TheAuthor")));
    }
}
