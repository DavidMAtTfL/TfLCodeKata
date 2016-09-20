The idea is that stored procedure calls at the end of the script would be made by a .net process:

This is the most complex (Scenario 6) data set returned by the attached script.:

| OrderNo |	OrderLineNo	| Product	Quantity | Price	| ProductDiscount |	Promotion	|	SelectionCriteria |	SelectionParameter | 	DiscountCriteria | DiscountAmount|
| 6 |	1	|	HP1	|	2 |	8	|	0.8	|	HP_Promotion2	DistinctItemsCount	| 2	|	Percent |	5 |
6		1			HP1		2			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		1			HP1		2			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		1			HP1		2			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		2			HP2		2			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		2			HP2		2			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		2			HP2		2			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		2			HP2		2			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		3			HP3		2			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		3			HP3		2			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		3			HP3		2			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		3			HP3		2			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		4			HP4		1			8		0.4				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		4			HP4		1			8		0.8				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		4			HP4		1			8		1.6				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		4			HP4		1			8		2				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		5			HP5		1			8		0.4				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		5			HP5		1			8		0.8				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		5			HP5		1			8		1.6				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		5			HP5		1			8		2				HP_Promotion5	DistinctItemsCount	5					Percent				25

.net could flatten this out, anywhere ‘Quantity =2’ would become a new row in the array:


OrderNo	OrderLineNo	Product	Quantity	Price	ProductDiscount	Promotion		SelectionCriteria	SelectionParameter	DiscountCriteria	DiscountAmount
6		1			HP1		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		1			HP1		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		1			HP1		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		1			HP1		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		1			HP1		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		1			HP1		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		1			HP1		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		1			HP1		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		2			HP2		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		2			HP2		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		2			HP2		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		2			HP2		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		2			HP2		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		2			HP2		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		2			HP2		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		2			HP2		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		3			HP3		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		3			HP3		1			8		0.8				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		3			HP3		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		3			HP3		1			8		1.6				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		3			HP3		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		3			HP3		1			8		3.2				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		3			HP3		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		3			HP3		1			8		4				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		4			HP4		1			8		0.4				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		4			HP4		1			8		0.8				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		4			HP4		1			8		1.6				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		4			HP4		1			8		2				HP_Promotion5	DistinctItemsCount	5					Percent				25
6		5			HP5		1			8		0.4				HP_Promotion2	DistinctItemsCount	2					Percent				5
6		5			HP5		1			8		0.8				HP_Promotion3	DistinctItemsCount	3					Percent				10
6		5			HP5		1			8		1.6				HP_Promotion4	DistinctItemsCount	4					Percent				20
6		5			HP5		1			8		2				HP_Promotion5	DistinctItemsCount	5					Percent				25


.net could then process this new ‘flattened’ array, by Maximum Possible Promotion Value Descending, in cycles. Each cycle would process each promotion recursively (IE, if a Promotion is valid, try it again and again until it is no longer valid), then try the next most valuable promotion again recursively and so on.

Cycle 1	HP_Promotion5	HP_Promotion4	HP_Promotion3	HP_Promotion2
Cycle 2	HP_Promotion4	HP_Promotion3	HP_Promotion2	
Cycle 3	HP_Promotion3	HP_Promotion2		
Cycle 4	HP_Promotion2	 	 	 

For this data set, the process should find the following applicable promotions:

Cycle 1 = HP_Promotion5 then HP_Promotion3
Cycle 2 = HP_Promotion4 then HP_Promotion4
Cycle 3 = Lots of low value combinations
Cycle 4 = Lots of low value combinations

At the end of all 4 cycles, select the cycle that yielded the highest discount (Cycle 2 in this example)

It’s a row by row, CPU and memory intensive process not really suited to SQL Server which would suffer from all sorts of locks and wouldn’t scale well. Multiple .net calls to ‘Get Promotion / Order Details’ could be run concurrently though, discounts calculated by these .net calls could then be written back to the SQL Server ‘Purchase Order’ table as negative values. If Total Order Price is the sum of the Order Lines then the negative values added for Discounts would reduce the Total Order Price.
