The Naughty and nice engine.

Your task is to take an input stream of service bus messages from a queue, which contain users along with some details and a list of the naughty and nice things they have done.
Your task is to assign lumps of coal and / or candy canes to these users, depending on how well they have behaved. 

You will have to agree on which behaviours deserve more lumps of coal or candy canes than others. 

Extensions:

If a user has Elf in their name or address, then they should receive 5 extra candy canes.

If someone has done something naughty, but has then done something nice that is in a similar category, then they should cancel each other out and the user should not receive anything for those 2 deeds.

for example, if someone has stolen a mince pie, but also volunteered at a soup kitchen, then these should cancel out.


"{\"name\":
	{\"title\":\"mrs\",
	\"first\":\"gloria\",
	\"last\":\"parra\"}

,\"gender\":\"female\",

\"location\":
	{\"street\":\"2743 avenida de andalucía\",
	\"city\":\"barcelona\",
	\"postcode\":\"26559\"},

\"phone\":\"960-308-520\",

\"Naughty\":[],

\"Nice\":
	[\"gave your employees a pay rise\",
	\"volunteered a soup kitchen\",
	\"left a carrot out for rudolph\",
	\"went to church\"]}"


"{\"name\":
	{\"title\":\"mr\",
	\"first\":\"célian\",
	\"last\":\"philippe\"}
,\"gender\":\"male\",

\"location\":
	{\"street\":\"7404 rue des jardins\",
	\"city\":\"grenoble\",
	\"postcode\":\"43254\"},

\"phone\":\"04-07-04-79-67\",

\"Naughty\":
	[\"Argued with their spouse\",
	\"Argued with their spouse\",
	\"shouted at carol singers\"],

\"Nice\":
	[\"left a carrot out for rudolph\",
	\"shouted yippe kayeeeh at all the right moments in die hard\"]}"