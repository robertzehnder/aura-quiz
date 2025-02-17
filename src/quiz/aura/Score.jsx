import React, { Component } from "react";
import "../App.css";

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedAura: null, // Tracks which aura's description is expanded
        };
    }

    auraDescriptions = {
        "Red": "Physical and sexual expression is the hallmark of a Red. The key to success for Reds is to act on what they know about physical reality and the tangible environment. Reds are literal in their interpretation of what goes on around them. They are not abstract thinkers; for them, a table is a table, period. They are comfortable and safe in a world of nature and the elements. They pursue life with gusto, verve, and courage. The most powerful aspect of Reds is their ability to be in the world, to manage the aspects and realities of everyday living with self-confidence and assurance. Their gift is the respect and the awe they have for the majesty and the might of nature. They seem to understand their role in the equation of humans and physical reality.",
        "Orange": "In the personality spectrums system, orange is the color for individuals who need to test their own physical limitations against the environment. Fearless, powerful, heedless of their own personal safety, they shake their fists in the face of God. The challenge for Oranges is to deal with our increasingly complex society. We are faced not so much with physical survival problems as with complicated moral and ethical questions.",
        "Yellow": "Yellows are those people most affected by the body's sensitive biochemical balance. When they are not careful, they are susceptible to physical addiction—bodily cravings. Yellows need to learn to recognize and act on the signals their bodies send them. The best way for Yellows to measure their own success is by the amount of joy they are experiencing in life.",
        "Green": "Intellectually intense, and able to pare an idea to the bone—these are attributes of an analytical Green. Greens measure their own worth by their ability to be productive, generating countless ideas and projects, and by their creative ability, which allows them to devise innovative, workable solutions to problems.",
        "Blue": "Blues embody the characteristics of nurturing and caretaking. They are the Personality Spectrums color most concerned with helping other people. Service is a form of altruism, a giving of oneself. It is the art of anticipating the needs of other human beings and ministering to those needs while at the same time allowing for individuals to maintain their dignity.",
        "Indigo": "The reality of our world is a shifting, evolving, dynamic energy field. As part of this ecosystem, humanity is growing and developing. As the needs of the whole shift, changes need to be made in the parts that make up that whole. So it is with the auras. A new color—Indigo—has emerged, with skills, talents, and physical characteristics significantly different from those of the other colors.",
        "Violet": "Violets are the Personality Spectrums color that is most nearly aligned with the psychic, emotional, and spiritual balance in operation on the planet at this time. They have not only the opportunity but also the resources to make their lives count for something, to make a significant difference to our collective future.",
        "Lavender": "Dreamer, drifter, fantasizer—these are the words that best describe Lavenders. They first see the shifting layers of shape, form, and pattern that make up designs. The Lavenders dissolve and recombine these designs to create new structures and concepts.",
        "Magenta": "The key to understanding the Magenta Personality Spectrums color is their unwillingness to conform to the expectations and norms set by society. These individuals seek to express their individuality by using, with creativity and flair, the belongings and raw materials at their disposal.",
        "Crystal": "Crystals are natural healers. They utilize energy to transform light into healing rays. They become the medium or the conduit through which healing passes. They are able to increase their personal, physical power to the point where they are able to cleanse the minds and souls so that physical healing can follow.",
        "Mental Tan": "The key to happiness and success for a Mental Tan is understanding the process of intuition. They must journey from cold logic into the unknown of metaphysics. They can accomplish this task only if they are willing to become risk takers.",
        "Physical Tan": "Physical Tans are one of the three Eclipse Colors. An eclipse is different from an overlay. To have an eclipse in the aura means that the individual has two bands of color that completely surround the body, one outside the other. These two colors are interpreted as one color.",
        "Nurturing Tan": "Nurturing Tans are another of the Eclipse Colors in the Personality Spectrums system. The color closest to their body is Mental Tan. Outside the Mental Tan and completely encircling their body is a band of Blue.",
        "Loving Tan": "Loving Tan is another Personality Spectrums color that is distinguished by an eclipse, a second band of color, which is Red. The Red Eclipse adds the component of unconditional love. Loving Tans are bright and inquisitive and have a love for people.",
    };

    calculateAura(scores) {
        const auraGroups = {
            "Red": [13, 27, 41, 55, 69, 83, 97],
            "Orange": [9, 23, 37, 51, 65, 79, 93],
            "Yellow": [14, 28, 42, 56, 70, 84, 98],
            "Green": [3, 17, 31, 45, 59, 73, 87],
            "Blue": [6, 20, 34, 48, 62, 76, 90],
            "Indigo": [12, 26, 40, 54, 68, 82, 96],
            "Violet": [2, 16, 30, 44, 58, 72, 86],
            "Lavender": [4, 18, 32, 46, 60, 74, 88],
            "Magenta": [5, 19, 33, 47, 61, 75, 89],
            "Crystal": [8, 22, 36, 50, 64, 78, 92],
            "Mental Tan": [1, 15, 29, 43, 57, 71, 85],
            "Physical Tan": [10, 24, 38, 52, 66, 80, 94],
            "Nurturing Tan": [7, 21, 35, 49, 63, 77, 91],
            "Loving Tan": [11, 25, 39, 53, 67, 81, 95],
        };

        // Calculate total for each aura
        const auraScores = Object.entries(auraGroups).map(([aura, indices]) => ({
            aura,
            total: indices.reduce((sum, index) => sum + (scores[index - 1] || 0), 0), // -1 to account for 0-based index
        }));

        // Sort auras by total score in descending order
        return auraScores.sort((a, b) => b.total - a.total);
    }

    toggleAuraDescription = (aura) => {
        this.setState((prevState) => ({
            expandedAura: prevState.expandedAura === aura ? null : aura,
        }));
    };

    render() {
        const { scores } = this.props; // Pass the scores array as a prop
        const auraRankings = this.calculateAura(scores);
        const { expandedAura } = this.state;

        return (
            <div>
                <h2>Results</h2>
                <h4>Your Highest Ranked Aura: {auraRankings[0].aura}</h4>
                <p>{this.auraDescriptions[auraRankings[0].aura]}</p>

                <h3>Rankings</h3>
                <ul>
                    {auraRankings.map((ranking, index) => (
                        <li key={ranking.aura}>
                            <div>
                                <strong>
                                    {index + 1}. {ranking.aura}: {ranking.total}
                                </strong>
                                {expandedAura === ranking.aura ? (
                                    <p>{this.auraDescriptions[ranking.aura]}</p>
                                ) : (
                                    <button
                                        onClick={() => this.toggleAuraDescription(ranking.aura)}
                                    >
                                        {expandedAura === ranking.aura ? "Collapse" : "Expand"}
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Score;
