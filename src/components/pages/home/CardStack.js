// import React, { useState } from "react";
// import { TinderLikeCard } from "react-stack-cards";

// import { tokens } from "../../tokens/premier-league";

// import Token from "../../tokens/Token";
// import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";

// const CardStack = ({ initialized }) => {
//   const [Stack, setStack] = useState(null);
//   const bgColors = Array(tokens.length).fill("transparent");

//   const onSwipe = () => {
//     Stack.swipe();
//   };

//   return (
//     <>
//       <Row>
//         <TinderLikeCard
//           colors={bgColors}
//           width="265"
//           height="435"
//           direction="swipeRight"
//           duration={200}
//           ref={(node) => setStack(node)}
//           className="tinder"
//         >
//           {tokens.map((token) => (
//             <Card className="d-block w-100" key={token.id} onClick={onSwipe}>
//               {initialized ? (
//                 <Token token={token} />
//               ) : (
//                 <>
//                   <Image
//                     src={window.location.origin + "/logos/" + token.image}
//                     alt={token.name}
//                     height={130}
//                     className="logo-image mb-3"
//                   />
//                   <h5>{token.name}</h5>
//                 </>
//               )}
//             </Card>
//           ))}
//         </TinderLikeCard>
//       </Row>
//     </>
//   );
// };

// export default CardStack;
