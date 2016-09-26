USE master;
GO
 
---------------------------------------------------------------------------------------------------------------
-- Initialize new database
:SETVAR DatabaseName "HPC_PromotionsEngine"
:SETVAR DataDrive "X:\MSSQL\Data\"
:SETVAR LogDrive "X:\MSSQL\Logs\" 
           
---------------------------------------------------------------------------------------------------------------
-- Database Setup, drop if exists and create with memory optimized filegroup
IF DATABASEPROPERTYEX(N'$(databasename)','Status') IS NOT NULL
BEGIN
    ALTER DATABASE $(DatabaseName) SET SINGLE_USER WITH ROLLBACK IMMEDIATE
    DROP DATABASE $(DatabaseName)
END
 
    
CREATE DATABASE $(DatabaseName)
ON
( 
    NAME = $(DatabaseName)_data,
    FILENAME = N'$(DataDrive)$(DatabaseName)_data.mdf',
    SIZE = 10,
    MAXSIZE = 500,
    FILEGROWTH = 5 )
    LOG ON
    ( NAME = $(DatabaseName)_log,
    FILENAME = N'$(LogDrive)$(DatabaseName).ldf',
    SIZE = 5MB,
    MAXSIZE = 5000MB,
    FILEGROWTH = 5MB 
);     
 
 
ALTER DATABASE $(DatabaseName)
ADD FILEGROUP $(DatabaseName)_MOD CONTAINS MEMORY_OPTIMIZED_DATA
 
DECLARE @nSQL NVARCHAR(2000), @DB_DataFolder NVARCHAR(100);
   
SELECT @DB_DataFolder = REVERSE(RIGHT(REVERSE(physical_name),(LEN(physical_name)-CHARINDEX('\', REVERSE(physical_name),1))+1))
FROM sys.master_files
WHERE [name] = '$(DatabaseName)_data'
 
SELECT @nSQL = '
ALTER DATABASE $(DatabaseName)
ADD FILE(NAME = $(DatabaseName)_MOD, 
FILENAME = ' + '''' + @DB_DataFolder + '$(DatabaseName)_XTP_MOD' + '''' + ') 
TO FILEGROUP $(DatabaseName)_MOD'
   
EXEC sp_executesql @nSQL;
ALTER DATABASE $(DatabaseName) SET RECOVERY SIMPLE;    
GO
 
USE $(DatabaseName)
GO
 
-----------------------------------------------------------------------------------------------------
-- SETUP - Products Table
BEGIN TRY DROP TABLE dbo.Product END TRY BEGIN CATCH PRINT 'Creating Product Table' END CATCH;
GO
CREATE TABLE dbo.Product
(
    Product varchar(50) NOT NULL,
    Price money NULL,
    CONSTRAINT PK_Product PRIMARY KEY CLUSTERED (Product ASC)
) ON [PRIMARY]
GO
 
INSERT INTO dbo.Product (Product, Price)
SELECT 'HP1',8
UNION
SELECT 'HP2',8
UNION
SELECT 'HP3',8
UNION
SELECT 'HP4',8
UNION
SELECT 'HP5',8

-- Test Exclusions - Not a Promotion Product
UNION
SELECT 'HP6',8;
 
-----------------------------------------------------------------------------------------------------
-- SETUP - Purchase Orders Table
BEGIN TRY DROP TABLE dbo.PurchaseOrder END TRY BEGIN CATCH PRINT 'Creating Purchase Order Table' END CATCH;
GO
CREATE TABLE dbo.PurchaseOrder
(
    OrderNo int NOT NULL,
    OrderLineNo int NOT NULL,
    Product varchar(50) NULL,
    Quantity int NULL,
    CONSTRAINT PK_PurchaseOrder PRIMARY KEY CLUSTERED (OrderNo ASC, OrderLineNo ASC)
) ON [PRIMARY]
GO
 
INSERT INTO dbo.PurchaseOrder (OrderNo, OrderLineNo, Product, Quantity)

-- Scenario 1
SELECT 1,1,'HP1',1

-- Scenario 2
UNION
SELECT 2,1,'HP1',1
UNION
SELECT 2,2,'HP2',1

-- Scenario 3
UNION
SELECT 3,1,'HP1',2

-- Scenario 4
UNION
SELECT 4,1,'HP1',1
UNION
SELECT 4,2,'HP2',1
UNION
SELECT 4,3,'HP3',1

-- Scenario 5
UNION
SELECT 5,1,'HP1',2
UNION
SELECT 5,2,'HP2',2
UNION
SELECT 5,3,'HP3',1

-- Scenario 6
UNION
SELECT 6,1,'HP1',2
UNION
SELECT 6,2,'HP2',2
UNION
SELECT 6,3,'HP3',2
UNION
SELECT 6,4,'HP4',1
UNION
SELECT 6,5,'HP5',1

-----------------------------------------------------------------------------------------------------
-- SETUP - Promotions Table with JASON format Qualifying Products and Promotion Details

BEGIN TRY DROP TABLE dbo.Promotion END TRY BEGIN CATCH PRINT 'Creating Promotion Table' END CATCH;
GO
CREATE TABLE dbo.Promotion
(
    Promotion varchar(50) NOT NULL,
    Products nvarchar(250) NULL CONSTRAINT [ProductsJSON] CHECK (ISJSON(Products)>0),
    PromotionDetails nvarchar(250) NULL CONSTRAINT [PromotionDetailsJSON] CHECK (ISJSON(PromotionDetails)>0),
    Active bit NULL,
    CONSTRAINT PK_Promotion PRIMARY KEY CLUSTERED (Promotion ASC)
) ON [PRIMARY]
GO

-- 2 Distinct Qualifying Products = 5% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"2","DiscountCriteria":"Percent","DiscountAmount":"5"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion2', @Products, @Promotion, 1)
GO
 
-- 3 Distinct Qualifying Products = 10% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"3","DiscountCriteria":"Percent","DiscountAmount":"10"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion3', @Products, @Promotion, 1)
GO
 
-- 4 Distinct Qualifying Products = 20% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"4","DiscountCriteria":"Percent","DiscountAmount":"20"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion4', @Products, @Promotion, 1)
GO
 
-- 5 Distinct Qualifying Products = 25% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"5","DiscountCriteria":"Percent","DiscountAmount":"25"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion5', @Products, @Promotion, 1)
GO
 
-----------------------------------------------------------------------------------------------------
-- SETUP - Active Promotion Details View
BEGIN TRY DROP VIEW dbo.vActivePromotionDetails END TRY BEGIN CATCH PRINT 'Creating Active Promotions View' END CATCH;;
GO
 
CREATE VIEW dbo.vActivePromotionDetails AS
SELECT
    Promotion, 
    CAST(JSON_VALUE(x2.value, '$.Product') AS NVARCHAR(50)) AS Product, 
    CAST(JSON_VALUE(x3.value, '$.SelectionCriteria') AS NVARCHAR(50)) AS SelectionCriteria,
    CAST(JSON_VALUE(x3.value, '$.SelectionParameter') AS NVARCHAR(50)) AS SelectionParameter,
    CAST(JSON_VALUE(x3.value, '$.DiscountCriteria') AS NVARCHAR(50)) AS DiscountCriteria,
    CAST(JSON_VALUE(x3.value, '$.DiscountAmount') AS INT) AS DiscountAmount
FROM dbo.Promotion x1
CROSS APPLY OPENJSON(x1.Products,'$.QualifyingProducts') AS x2
CROSS APPLY OPENJSON(x1.PromotionDetails, '$.Promotion') AS x3
WHERE x1.Active = 1
GO

-----------------------------------------------------------------------------------------------------
-- In-Memory Work Tables, Session ID to isolate multiple concurrent threads

-- Driver for discount calculation cycles, identfies all possible order product discounts 
CREATE TABLE dbo.tempOrderPromotionCycles
(  
	SessionID INT,
	Cycle INT,
	Promotion VARCHAR(50),
	PromotionSequence INT,

	INDEX ix_tempOrderPromotionCycles NONCLUSTERED (SessionID),  
      
    CONSTRAINT CHK_tempOrderPromotionCycles_SessionID
        CHECK ( SessionID = @@spid ),  
)  
    WITH  
        (MEMORY_OPTIMIZED = ON,  
         DURABILITY = SCHEMA_ONLY);  
GO 


-- Used for an Order / Promotion dataset specific to session, used for entire order
CREATE TABLE dbo.tempOrderPromotionBaseSet
(  
	SessionID INT,
	WorkSetKey INT,
	OrderNo INT,
	OrderLineNo INT,
	Product VARCHAR(50),
	Price MONEY,
	Promotion VARCHAR(50),
	SelectCriteria VARCHAR(50),
	SelectParameter NVARCHAR(50),
	DiscountCriteria NVARCHAR(50),
	DiscountAmount INT,

	INDEX ix_tempOrderPromotionBaseSet NONCLUSTERED (SessionID),  
      
    CONSTRAINT CHK_tempOrderPromotionBaseSet_SessionID
        CHECK ( SessionID = @@spid ),  
)  
    WITH  
        (MEMORY_OPTIMIZED = ON,  
         DURABILITY = SCHEMA_ONLY);  
GO 

-- Used for a discount calculation cycle, multiple cycles (for different promotions) refresh each time
CREATE TABLE dbo.tempOrderPromotionCycleSet
(  
	SessionID INT,
	CycleSet INT,
	WorkSetKey INT,
	OrderNo INT,
	OrderLineNo INT,
	Product VARCHAR(50),
	Price MONEY,
	Promotion VARCHAR(50),
	SelectCriteria VARCHAR(50),
	SelectParameter NVARCHAR(50),
	DiscountCriteria NVARCHAR(50),
	DiscountAmount INT,

	INDEX ix_tempOrderPromotionCycleSet NONCLUSTERED (SessionID, CycleSet),  
      
    CONSTRAINT CHK_tempOrderPromotionCycleSet_SessionID
        CHECK ( SessionID = @@spid ),  
)  
    WITH  
        (MEMORY_OPTIMIZED = ON,  
         DURABILITY = SCHEMA_ONLY);  
GO 

-- Used for Initial Calculation of discounts
CREATE TABLE dbo.tempOrderPromotionCycleResult
(  
	SessionID INT,
	CycleSet INT,
	WorkSetKey INT,
	OrderNo INT,
	OrderLineNo INT,
	Product VARCHAR(50),
	Price MONEY,
	Promotion VARCHAR(50),
	SelectCriteria VARCHAR(50),
	SelectParameter NVARCHAR(50),
	DiscountCriteria NVARCHAR(50),
	DiscountAmount INT,
	ProductSequence INT,
	ProductCount INT

	INDEX ix_tempOrderPromotionCycleResult NONCLUSTERED (SessionID, CycleSet),  
      
    --CONSTRAINT CHK_tempOrderPromotionCycleResult_SessionID
    --    CHECK ( SessionID = @@spid ),  
)  
    WITH  
        (MEMORY_OPTIMIZED = ON,  
         DURABILITY = SCHEMA_ONLY);  
GO 

-- Used to store qualifying discounts results, the final result set
CREATE TABLE dbo.tempOrderPromotionCycleResultSequence
(  
	SessionID INT,
	CycleSet INT,
	WorkSetKey INT,
	OrderNo INT,
	OrderLineNo INT,
	Product VARCHAR(50),
	Price MONEY,
	Promotion VARCHAR(50),
	SelectCriteria VARCHAR(50),
	SelectParameter NVARCHAR(50),
	DiscountCriteria NVARCHAR(50),
	DiscountAmount INT,
	ProductSequence INT,
	ProductCount INT

	INDEX ix_tempOrderPromotionCycleResultSequence NONCLUSTERED (SessionID, CycleSet),  
      
    --CONSTRAINT CHK_tempOrderPromotionCycleResult_SessionID
    --    CHECK ( SessionID = @@spid ),  
)  
    WITH  
        (MEMORY_OPTIMIZED = ON,  
         DURABILITY = SCHEMA_ONLY);  
GO 


-----------------------------------------------------------------------------------------------------
-- Get Order and Promotion Details for Discount Calculation 
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'GetOrderAndPromotionsDetails') 
EXEC ('CREATE PROC dbo.GetOrderAndPromotionsDetails AS SELECT ''stub version, to be replaced''') 
GO 

ALTER PROCEDURE dbo.GetOrderAndPromotionsDetails (@OrderNo INT, @SuppressOutput INT = 0) AS
BEGIN

-- Set execution context
SET NOCOUNT ON;

-- Tidy information for this session id in the memory optimized tables
DELETE FROM dbo.tempOrderPromotionCycles WHERE SessionID = @@SPID; 
DELETE FROM dbo.tempOrderPromotionBaseSet WHERE SessionID = @@SPID; 
DELETE FROM dbo.tempOrderPromotionCycleSet WHERE SessionID = @@SPID; 
DELETE FROM dbo.tempOrderPromotionCycleResult WHERE SessionID = @@SPID; 
DELETE FROM dbo.tempOrderPromotionCycleResultSequence WHERE SessionID = @@SPID; 

-- Declare Variables
DECLARE @Cycle INT, @LastCycle INT, @Promotion NVARCHAR(50), @MaxProductSequence INT, @CurProductSequence INT;
DECLARE @SelectionCriteria NVARCHAR(50), @SelectionParameter INT, @DiscountCriteria NVARCHAR(50), @DiscountAmount INT;

-- Populate the Order and Promotion Qualifying driver table
DECLARE @MaximumQuantity INT;
SELECT @MaximumQuantity = MAX(Quantity) FROM dbo.PurchaseOrder WHERE OrderNo = @OrderNo GROUP BY OrderNo;

With ThinOrderLines AS
(
	SELECT
		po.OrderNo, po.OrderLineNo, po.Product, po.Quantity, p.Price, 
		apd.Promotion, apd.SelectionCriteria, apd.SelectionParameter, apd.DiscountCriteria, apd.DiscountAmount  
	FROM dbo.vActivePromotionDetails apd
	FULL OUTER JOIN dbo.PurchaseOrder po
		ON apd.Product = po.Product
	INNER JOIN dbo.Product p
		ON p.Product = po.Product
	WHERE OrderNo = @OrderNo
)
, OrderLineExplode (Product, Promotion, Quantity) AS
(
	SELECT Product, Promotion, 1 AS Quantity
	FROM ThinOrderLines 
	UNION ALL
	SELECT Product, Promotion, Quantity + 1 AS Quantity
	FROM OrderLineExplode
	WHERE Quantity < @MaximumQuantity
)
, FatOrderLines AS
(
	SELECT 
		tol.OrderNo, tol.OrderLineNo, tol.Product, tol.Price, tol.Promotion, tol.SelectionCriteria, tol.SelectionParameter, tol.DiscountCriteria, tol.DiscountAmount
	FROM ThinOrderLines tol
	INNER JOIN OrderLineExplode FOL
		ON tol.Product = fol.Product
		AND tol.Promotion = fol.Promotion
	WHERE fol.Quantity <= tol.Quantity
)
INSERT INTO dbo.tempOrderPromotionBaseSet 
(
	SessionID, WorkSetKey, OrderNo, OrderLineNo, Product, Price,
	Promotion, SelectCriteria, SelectParameter, DiscountCriteria, DiscountAmount
)
SELECT 
	@@SPID, ROW_NUMBER() OVER(ORDER BY OrderNo, OrderLineNo, Product) AS WorkSetKey,
	OrderNo, OrderLineNo, Product, Price, Promotion, SelectionCriteria, SelectionParameter, DiscountCriteria, DiscountAmount
FROM FatOrderLines
ORDER BY OrderNo, OrderLineNo, Promotion
OPTION ( MAXRECURSION 32767 );

-- Populate tempOrderPromotionCycles
;WITH TotalPromotionDiscount AS
( 
	SELECT Promotion, SUM(DiscountAmount) AS TotalDiscountAmount
	FROM dbo.vActivePromotionDetails
	GROUP BY Promotion
)
, OrderedPromotionDiscount AS
(
	SELECT Promotion, ROW_NUMBER() OVER(ORDER BY TotalDiscountAmount DESC) AS PromotionSequence
	FROM TotalPromotionDiscount
)
, PromotionCyclesMAX AS
(
	SELECT MAX(PromotionSequence) AS PromotionCycles
	FROM OrderedPromotionDiscount
),
PromotionCycles (Cycle) AS
(
	SELECT 1 AS Cycle
	UNION ALL
	SELECT Cycle + 1
	FROM PromotionCycles
	WHERE Cycle < (SELECT PromotionCycles FROM PromotionCyclesMAX)
)
INSERT INTO dbo.tempOrderPromotionCycles (SessionID, Cycle, Promotion ,PromotionSequence)
SELECT @@SPID AS SessionID, pc.Cycle, opd.Promotion, opd.PromotionSequence
FROM OrderedPromotionDiscount opd
CROSS APPLY PromotionCycles pc
WHERE pc.Cycle <= opd.PromotionSequence
ORDER BY pc.Cycle, opd.PromotionSequence

------------------------------------------------------------------------------------------------------------------------------------
-- Process all possible order product / promotion combinations
SET @LastCycle = 0;
DECLARE PromotionCycles CURSOR FOR
SELECT Cycle, x1.Promotion,
    CAST(JSON_VALUE(x3.value, '$.SelectionCriteria') AS NVARCHAR(50)) AS SelectionCriteria,
    CAST(JSON_VALUE(x3.value, '$.SelectionParameter') AS INT) AS SelectionParameter,
    CAST(JSON_VALUE(x3.value, '$.DiscountCriteria') AS NVARCHAR(50)) AS DiscountCriteria,
    CAST(JSON_VALUE(x3.value, '$.DiscountAmount') AS INT) AS DiscountAmount
FROM dbo.tempOrderPromotionCycles x1
JOIN dbo.Promotion x2
	ON x1.Promotion = x2.Promotion
CROSS APPLY OPENJSON(x2.PromotionDetails, '$.Promotion') AS x3
WHERE SessionID = @@SPID
ORDER BY SessionID, Cycle, PromotionSequence;

OPEN PromotionCycles
FETCH NEXT FROM PromotionCycles INTO @Cycle, @Promotion, @SelectionCriteria, @SelectionParameter, @DiscountCriteria, @DiscountAmount

WHILE @@FETCH_STATUS = 0
BEGIN

	IF @Cycle <> @LastCycle
	BEGIN

		DELETE FROM dbo.tempOrderPromotionCycleSet WHERE SessionID = @@SPID;

		INSERT INTO dbo.tempOrderPromotionCycleSet (SessionID, CycleSet, WorkSetKey, OrderNo, OrderLineNo, Product, Price, Promotion, SelectCriteria, SelectParameter, DiscountCriteria,DiscountAmount)
		SELECT SessionID, @Cycle, WorkSetKey, OrderNo, OrderLineNo, Product, Price, Promotion, SelectCriteria, SelectParameter, DiscountCriteria,DiscountAmount
		FROM dbo.tempOrderPromotionBaseSet
		WHERE SessionID = @@SPID;

		SET @LastCycle = @Cycle
	END

	SET @MaxProductSequence = 0;
	WITH hProductSequences AS
	(
		SELECT COUNT(*) AS hProductSequence
		FROM dbo.tempOrderPromotionCycleSet
		WHERE Promotion = @Promotion 
		AND SessionID = @@SPID
		AND CycleSet = @Cycle
	)
	SELECT @MaxProductSequence = hProductSequence
	FROM hProductSequences;

	SET @CurProductSequence = 1;
	WHILE @CurProductSequence <= @MaxProductSequence
	BEGIN

		DELETE FROM dbo.tempOrderPromotionCycleResultSequence WHERE SessionID = @@SPID;

		;WITH WorkSet AS 
		(
			SELECT *, ROW_NUMBER() OVER(PARTITION BY Product ORDER BY WorkSetKey) AS ProductSequence
			FROM dbo.tempOrderPromotionCycleSet
			WHERE SessionID = @@SPID
			AND CycleSet = @Cycle
			AND Promotion = @Promotion
		)
		, FilteredDataSet AS
		(
			SELECT * 
			FROM WorkSet sw
			WHERE sw.ProductSequence = 1
		)
		, FilteredDataSetSummary1 AS
		(
			SELECT ws.SessionID, ws.Product 
			FROM FilteredDataSet ws
			GROUP BY ws.SessionID, Product
		)

		, FilteredDataSetSummary2 AS 
		(
			SELECT SessionID, COUNT(*) AS DataSetItems
			FROM FilteredDataSetSummary1
			GROUP BY SessionID
		)
		, DataSet AS
		(
			SELECT TOP(@SelectionParameter)
				 fds.SessionID
				,@Cycle AS Cycle
				,fds.WorkSetKey, fds.OrderNo, fds.OrderLineNo, fds.Product, fds.Price, fds.Promotion, fds.SelectCriteria, fds.SelectParameter, fds.DiscountCriteria, fds.DiscountAmount
				, fds.ProductSequence
				,fdss.DataSetItems AS ProductCount
			FROM FilteredDataSet fds
			INNER JOIN FilteredDataSetSummary2 fdss
				ON fds.SessionID = fdss.SessionID
			WHERE fdss.DataSetItems >= @SelectionParameter
		)
		INSERT INTO dbo.tempOrderPromotionCycleResult
		(
			SessionID, CycleSet, WorkSetKey, OrderNo, OrderLineNo, Product, Price, Promotion, SelectCriteria, 
			SelectParameter, DiscountCriteria,DiscountAmount, ProductSequence, ProductCount
		)
		OUTPUT
			inserted.SessionID, inserted.CycleSet, inserted.WorkSetKey, inserted.OrderNo, inserted.OrderLineNo, inserted.Product, inserted.Price, inserted.Promotion, inserted.SelectCriteria, 
			inserted.SelectParameter, inserted.DiscountCriteria,inserted.DiscountAmount, inserted.ProductSequence, inserted.ProductCount
		INTO dbo.tempOrderPromotionCycleResultSequence
		SELECT ds.*
		FROM DataSet ds;

		-- Remove item from consideration for other promotions within set.
		;WITH FirstItem AS 
		(
			SELECT SessionID, CycleSet, Product, Promotion, MIN(WorkSetKey) AS WorkSetKey
			FROM dbo.tempOrderPromotionCycleSet cs
			WHERE SessionID = @@SPID
			GROUP BY SessionID, CycleSet, Product, Promotion
		)
		DELETE cs
		FROM dbo.tempOrderPromotionCycleSet cs
		JOIN dbo.tempOrderPromotionCycleResultSequence rs
			ON cs.SessionID = rs.SessionID
			AND cs.CycleSet = rs.CycleSet
			AND cs.Product = rs.Product
		JOIN FirstItem fi
			ON cs.SessionID = fi.SessionID
			AND cs.CycleSet = fi.CycleSet
			AND cs.Product = fi.Product
			AND cs.WorkSetKey = fi.WorkSetKey

		SET @CurProductSequence = @CurProductSequence + 1;

	END

	FETCH NEXT FROM PromotionCycles INTO @Cycle, @Promotion, @SelectionCriteria, @SelectionParameter, @DiscountCriteria, @DiscountAmount
END
CLOSE PromotionCycles;
DEALLOCATE PromotionCycles;

-- Present Best Promotion Combination
IF @SuppressOutput = 0

	WITH BestPromotionCombo AS
	(
		SELECT SessionID, CycleSet, SUM((Price/100) * DiscountAmount) AS TotalDiscountOnProduct 
		FROM dbo.tempOrderPromotionCycleResult
		WHERE SessionID = @@SPID
		GROUP BY SessionID, CycleSet
	)
	, BestPromotionComboSorted AS
	(
		SELECT SessionID, CycleSet, ROW_NUMBER() OVER(ORDER BY TotalDiscountOnProduct DESC) AS SelectedCycleRowNumber   
		FROM BestPromotionCombo
	)
	, RevisedOrderDetails AS
	(
		SELECT rs.OrderNo, OrderLineNo, Product, Promotion, SUM(((Price/100) * DiscountAmount) * -1) AS Price
		FROM dbo.tempOrderPromotionCycleResult rs
		INNER JOIN BestPromotionComboSorted pc
			ON pc.SessionID = rs.SessionID
			AND rs.CycleSet = pc.CycleSet
		WHERE pc.SelectedCycleRowNumber = 1
		GROUP BY rs.OrderNo, OrderLineNo, Product, Promotion
		UNION ALL
		SELECT po.OrderNo, po.OrderLineNo, po.Product, '' AS Promotion, SUM(po.Quantity * p.Price) AS Price
		FROM dbo.PurchaseOrder po
		JOIN dbo.Product p
			ON po.Product = p.Product
		WHERE OrderNo = @OrderNo
		GROUP BY po.OrderNo, po.OrderLineNo, po.Product
	)
	SELECT OrderNo, OrderLineNo, Product, Promotion, SUM(Price) AS Price
	FROM RevisedOrderDetails
	GROUP BY OrderNo, OrderLineNo, Product, Promotion
	UNION ALL
	SELECT OrderNo, '99999' AS OrderLineNo, '' AS Product, '' AS Promotion, SUM(Price) AS Price
	FROM RevisedOrderDetails 
	GROUP BY OrderNo
	ORDER BY OrderNo

END
GO






