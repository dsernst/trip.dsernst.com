import { BetaSignup } from '@/app/components/BetaSignup'

const avatar = {
  sage: '#8AAF8A',
  amber: '#D4821A',
  terra: '#B85C38',
  blue: '#6A8EAE',
} as const

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="badge">A trip ritual for people who matter</div>
          <h1>
            Random
            <br />
            <em>Trip.</em>
          </h1>
          <p className="hero-sub">
            For the people you keep meaning to see.
            <br />
            <br />
            <strong>Random Trip handles the hard parts</strong> — where to go, what everyone can
            afford, who can make it — so all you have to do is join.
          </p>
        </div>
        <div className="scroll-hint">how it works</div>
      </section>

      <section className="how-section">
        <div className="section-inner">
          <span className="label">The ritual</span>
          <h2 className="section-title">Simple by design.</h2>
          <div className="steps">
            <Step
              num="01"
              title="Invite your people"
              body="Family. Old friends. Whoever you want to keep close. The group makes one commitment: we're meeting up somewhere new, regularly. That's it."
            />
            <Step
              num="02"
              title="A destination gets picked for you"
              body="No voting. No debates. No one person stuck making the call. The destination is chosen based on where everyone is, what everyone can spend, and what your group has loved before. You find out together."
            />
            <Step
              num="03"
              title="Whoever can make it, joins"
              body="Opt out of any trip, anytime, no explanation needed. Life happens. The ritual keeps going."
            />
            <Step
              num="04"
              title="Leave a quick note after"
              body="A sentence or two from everyone who went. What clicked, what didn't. It quietly shapes the next pick."
            />
          </div>
        </div>
      </section>

      <section className="budget-section">
        <div className="budget-inner">
          <div>
            <span className="label">Budget &amp; location</span>
            <h2 className="budget-title">Built around real life.</h2>
            <p className="budget-body">
              Everyone sets <strong>their own spending limit</strong> — no awkward conversations, no
              one dragged somewhere they can&apos;t afford. Everyone shares{' '}
              <strong>roughly where they are</strong>, so the destination actually makes sense for
              the group.
            </p>
          </div>
          <div className="distance-cards">
            <div className="dist-card near">
              <div className="dist-card-title">Closer trips</div>
              <p>
                Easier to coordinate, cheaper to get to. Great for a long weekend when schedules are
                tight.
              </p>
            </div>
            <div className="dist-card far">
              <div className="dist-card-title">Farther trips</div>
              <p>
                More travel time, more cost — and more of an adventure. Both have a place in the
                rotation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="opt-section">
        <div className="opt-inner">
          <div>
            <span className="label">Opting out</span>
            <h2 className="opt-title">
              Committed to the ritual.
              <br />
              Not every trip.
            </h2>
            <p className="opt-body">
              Anyone can sit out any round, for any reason, at any time. No guilt. The group keeps
              the ritual going — whoever shows up, shows up.
            </p>
          </div>
          <div className="opt-demo">
            <div className="trip-card">
              <div className="trip-dest">New Orleans, LA</div>
              <div className="trip-date">Next trip · September {new Date().getFullYear()}</div>
              <div className="people-row">
                <Person initial="A" name="Alex" color={avatar.sage} status="in" />
                <Person initial="J" name="Jordan" color={avatar.amber} status="in" />
                <Person initial="M" name="Morgan" color={avatar.terra} status="in" />
                <Person initial="S" name="Sam" color={avatar.blue} status="out" />
              </div>
            </div>
            <p className="opt-note">No explanation needed.</p>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="reviews-inner">
          <span className="label">After the trip</span>
          <h2 className="reviews-title">
            It gets better
            <br />
            as you go.
          </h2>
          <div className="reviews-grid">
            <Review
              text="The old town was stunning and the food scene blew me away — I never would've chosen this myself."
              initial="A"
              author="Alex"
              trip="Valletta, Malta"
              color={avatar.sage}
            />
            <Review
              text="Loved it, but somewhere with a slower pace next time — all the walking wore me out."
              initial="J"
              author="Jordan"
              trip="Valletta, Malta"
              color={avatar.amber}
            />
            <Review
              text="Couldn't make this one — hoping the next pick works with my schedule."
              initial="M"
              author="Morgan"
              trip="Valletta, Malta · sat out"
              color={avatar.terra}
            />
            <Review
              text="The surprise is genuinely half the fun. Glad I didn't have to decide."
              initial="S"
              author="Sam"
              trip="Valletta, Malta"
              color={avatar.blue}
            />
          </div>
          <div className="reviews-callout">
            <strong>Reviews feed the next pick.</strong> &ldquo;Jordan wants somewhere slower&rdquo;
            and &ldquo;the food in Valletta was a hit&rdquo; become quiet inputs — so each trip is a
            little better calibrated than the last.
          </div>
        </div>
      </section>

      <BetaSignup />

      <footer>
        <span className="wordmark">Random Trip.</span>
        <p>For the people you keep meaning to see.</p>
      </footer>
    </>
  )
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="step">
      <div className="step-num">{num}</div>
      <div className="step-content">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  )
}

function Person({
  initial,
  name,
  color,
  status,
}: {
  initial: string
  name: string
  color: string
  status: 'in' | 'out'
}) {
  return (
    <div className="person">
      <div className="person-name">
        <div className="avatar" style={{ backgroundColor: color }}>
          {initial}
        </div>
        {name}
      </div>
      <span className={`in-tag ${status === 'in' ? 'in' : 'out'}`}>
        {status === 'in' ? 'In' : 'Out this round'}
      </span>
    </div>
  )
}

function Review({
  text,
  initial,
  author,
  trip,
  color,
}: {
  text: string
  initial: string
  author: string
  trip: string
  color: string
}) {
  return (
    <div className="review-card">
      <p className="review-text">{text}</p>
      <div className="review-meta">
        <div className="avatar" style={{ backgroundColor: color }}>
          {initial}
        </div>
        <div>
          <div className="review-author">{author}</div>
          <div className="review-trip">{trip}</div>
        </div>
      </div>
    </div>
  )
}
