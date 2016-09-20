----------------------------------------------------------------------------------------------------
-- This script constructs and returns an Order/Promotion result set. 
-- It does not perform Discount Calculations, they should be performed in .net using arrays. 
-- The procedure calls at the end are examples, the .net 'Discount Calculation' engine should make these for a working data set.
--
-- Uses JASON data for Promotion Configurations, this requires SQL Server 2016
---  
----------------------------------------------------------------------------------------------------

-- Use tempdb for POC project
USE tempdb
GO

-----------------------------------------------------------------------------------------------------
-- SETUP - Products Table
BEGIN TRY DROP TABLE dbo.Product END TRY BEGIN CATCH PRINT 'Creating Product Table' END CATCH;
GO
CREATE TABLE dbo.Product
(
    Product varchar(20) NOT NULL,
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
SELECT 'HP5',8;
 
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
-- SETUP - Promotions Table
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
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":
{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"2","DiscountCriteria":"Percent","DiscountAmount":"5"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion2', @Products, @Promotion, 1)
GO
 
-- 3 Distinct Qualifying Products = 10% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":
{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"3","DiscountCriteria":"Percent","DiscountAmount":"10"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion3', @Products, @Promotion, 1)
GO
 
-- 4 Distinct Qualifying Products = 20% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":
{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"4","DiscountCriteria":"Percent","DiscountAmount":"20"}}}';
 
INSERT INTO dbo.Promotion (Promotion, Products, PromotionDetails, Active)
VALUES ('HP_Promotion4', @Products, @Promotion, 1)
GO
 
-- 5 Distinct Qualifying Products = 25% Discount  
DECLARE @Products NVARCHAR(MAX) = N'{"QualifyingProducts": [{"Product":"HP1"},{"Product":"HP2"},{"Product":"HP3"},{"Product":"HP4"},{"Product":"HP5"}]}';
DECLARE @Promotion NVARCHAR(MAX) = N'{"Promotion":{"Name":
{"SelectionCriteria":"DistinctItemsCount","SelectionParameter":"5","DiscountCriteria":"Percent","DiscountAmount":"25"}}}';
 
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
    JSON_VALUE(x2.value, '$.Product') AS Product, 
    JSON_VALUE(x3.value, '$.SelectionCriteria') AS SelectionCriteria,
    JSON_VALUE(x3.value, '$.SelectionParameter') AS SelectionParameter,
    JSON_VALUE(x3.value, '$.DiscountCriteria') AS DiscountCriteria,
    JSON_VALUE(x3.value, '$.DiscountAmount') AS DiscountAmount
FROM dbo.Promotion x1
CROSS APPLY OPENJSON(x1.Products,'$.QualifyingProducts') AS x2
CROSS APPLY OPENJSON(x1.PromotionDetails, '$.Promotion') AS x3
WHERE x1.Active = 1
GO

-----------------------------------------------------------------------------------------------------
-- Calculate Discount for Order 6 (Result set for .net discount calculations)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'GetOrderAndPromotionsDetails') 
EXEC ('CREATE PROC dbo.GetOrderAndPromotionsDetails AS SELECT ''stub version, to be replaced''') 
GO 

ALTER PROCEDURE dbo.GetOrderAndPromotionsDetails (@OrderNo INT) AS
BEGIN
	SELECT
		po.OrderNo, po.OrderLineNo, po.Product, po.Quantity, p.Price, (p.price / 100) * (apd.DiscountAmount * Quantity) AS ProductDiscount,
		apd.Promotion, apd.SelectionCriteria, apd.SelectionParameter, apd.DiscountCriteria, apd.DiscountAmount  
	FROM dbo.vActivePromotionDetails apd
	FULL OUTER JOIN dbo.PurchaseOrder po
		ON apd.Product = po.Product
	INNER JOIN dbo.Product p
		ON p.Product = po.Product
	WHERE OrderNo = @OrderNo
	ORDER BY OrderNo, OrderLineNo, Promotion
END
GO
-----------------------------------------------------------------------------------------------------
-- Get Order and Promotion Details (Called from .net, Order Number corresponds to Scenario)
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 1;
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 2;
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 3;
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 4;
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 5;
EXEC dbo.GetOrderAndPromotionsDetails @OrderNo = 6;



