import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PostThumbnail = (props) => {
  const { t } = useTranslation();
  var date = new Date(props.post.postedOn);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // month is zero-based
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const postedOn = dd + '/' + mm + '/' + yyyy;

  return (
    <Link
      to={"/post/" + props.post.id}
      as={NavLink}
      className="thumbnail text-decoration-none text-black"
    >
      <Card className="h-100 boxShadow">
        <Card.Header className="fst-italic">{props.post.postedBy}</Card.Header>
        <Card.Body>
          <Card.Title className="fst-italic">{props.post.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.post.content.slice(0, 200) + " . . ."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex text-muted">
          <div>{`${t("postedOn")}: ${postedOn}`}</div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default PostThumbnail;
