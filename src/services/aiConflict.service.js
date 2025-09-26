const resolveConflict = (conflictDetails) => {
    const { trainA, trainB, station } = conflictDetails;

    const suggestions = [
        `Reroute Express train ${trainA.name} via alternate junction to prioritize passenger flow.`,
        `Hold Goods train ${trainB.name} at ${station.name} for 15 minutes to clear the block section.`,
        `Prioritize ${trainA.name} (passenger train) over ${trainB.name} (goods train).`,
        `Delay departure of ${trainB.name} to manage congestion on the line ahead.`
    ];

    return {
        message: "AI-powered conflict resolution suggestions.",
        suggestions: suggestions.sort(() => 0.5 - Math.random()).slice(0, 2) // Return 2 random suggestions
    };
};

module.exports = { resolveConflict };