<%@ page import="java.sql.*"%> 

<html> 
  <head> 
    <title>Project Database Connection Example</title> 
  </head>
  <body> 
    <h1>Project Database Connection Example</h1> 
	<% 
		try {
			java.sql.Connection con; 
			Class.forName("com.mysql.jdbc.Driver"); 
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cs157a", "root", "MyNewPass"); // Your username and password
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("select * from `study sets`");
			out.println("Reading the database:");
			while(rs.next()) {
				out.println("Id: " + rs.getInt(1) + " " + rs.getString("Title"));
			}			
		} catch(Exception e) {
			out.println(e);
		}
	%> 
  </body> 
</html> 