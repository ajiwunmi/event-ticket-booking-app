import dotenv from "dotenv";
dotenv.config();
// test(".env | App Definition", async () => {
// 	expect(!!process.env.APP_NAME).toBeTruthy();
// 	expect(!!process.env.APP_SUPPORT_EMAIL).toBeTruthy();
// });

// test(".env | Server Definition", async () => {
// 	expect(!!process.env.SERVER_URL).toBeTruthy();
// 	expect(!!process.env.PORT).toBeTruthy();
// 	expect(!!process.env.PORT_ALT).toBeTruthy();
// 	expect(!!process.env.ENVIRONMENT).toBeTruthy();
// });

test(".env | DB Definition", async () => {
	expect(!!process.env.DB_HOST).toBeTruthy();
	expect(!!process.env.DB_PORT).toBeTruthy();
	expect(!!process.env.DB_USER).toBeTruthy();
	expect(!!process.env.NODE_ENV).toBeTruthy();
    expect(!!process.env.DB_PASS).toBeTruthy();
   
});
