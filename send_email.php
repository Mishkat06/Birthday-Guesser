<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my website comment_php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $comment = $_POST["comment"];

  $sql = "INSERT INTO demo (`Your Name`, `Your Comment`) VALUES ('$name', '$comment')";

  if ($conn->query($sql) === TRUE) {
    http_response_code(200);
    echo "Comment added successfully.";
  } else {
    http_response_code(500);
    echo "Failed to insert comment into database.";
  }
} else {
  // Retrieve comments from the database
  $sql = "SELECT * FROM demo";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo "<h2>Comments:</h2>";
    while ($row = $result->fetch_assoc()) {
      echo "<p><strong>Name:</strong> " . $row["Your Name"] . "</p>";
      echo "<p><strong>Comment:</strong> " . $row["Your Comment"] . "</p>";
      echo "<hr>";
    }
  } else {
    echo "<p>No comments yet.</p>";
  }
}

$conn->close();
?>
