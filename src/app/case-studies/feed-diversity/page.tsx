export default function FeedDiversityPage() {
    return (
      <main className="prose prose-invert mx-auto py-8">
        <h1>📈 Feed Fairness for Vernacular India</h1>
        <p><b>Impact:</b> Broadened content exposure, lifted DAU by 1% (+430K users)</p>
  
        <h2>1️⃣ Problem</h2>
        <ul>
          <li>The feed was repetitive—celebrity/viral content crowded out regional voices.</li>
          <li>Niche creators barely surfaced; 28% of users left for “nothing new.”</li>
        </ul>
  
        <h2>2️⃣ Insight</h2>
        <ul>
          <li>Data showed &lt;5% exposure for “long-tail” content.</li>
          <li>More diversity = longer sessions and more loyal DAUs.</li>
        </ul>
  
        <h2>3️⃣ Solution: Diversity-Aware Ranking</h2>
        <ul>
          <li>Decoupled popularity from diversity and novelty scores.</li>
          <li>Guaranteed new category and unseen creator each session.</li>
          <li>Ran live A/B test—full diversity model won on every north-star metric.</li>
        </ul>
  
        <h2>4️⃣ Results</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th><th>Before</th><th>After</th><th>Δ</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Daily Active Users</td><td>42.6M</td><td>43.0M</td><td>+1%</td></tr>
            <tr><td>Avg. Session Length</td><td>19.4min</td><td>20.0min</td><td>+3%</td></tr>
            <tr><td>Content-Mix Score</td><td>0.54</td><td>0.74</td><td>+38%</td></tr>
            <tr><td>Creator Fairness</td><td>0.67</td><td>0.49</td><td>Fairer</td></tr>
          </tbody>
        </table>
  
        <blockquote>
          <b>Next:</b> Real-time feedback chips, diversity-aware ads for small creators.
        </blockquote>
      </main>
    );
  }
  