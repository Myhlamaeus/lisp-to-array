/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x string
%%

\s+                     /* skip whitespace */
[0-9]+("."[0-9]+)?\b    {yytext = Number(yytext); return 'NUMBER';}
[^\s()]+                return 'TOKEN'
'"'                     this.begin('string');
<string>'"'             this.popState();
<string>(?:\\\"|[^"])*  {yytext = yytext.replace(/\\"/g, '"'); return 'STRING';}
<string><<EOF>>         return 'EOF_IN_STRING';
"("                     return 'LIST_START'
")"                     return 'LIST_END'
<<EOF>>                 return 'EOF'

/lex

%start expressions

%% /* language grammar */

expressions
    : list EOF
        {return $1;}
    ;

arguments
    : argument
        {$$ = [$1]}
    | argument arguments
        {$$ = [$1].concat($2)}
    ;

argument
    : STRING
        {$$ = ["`", $1]}
    | NUMBER
        {$$ = $1}
    | TOKEN
        {$$ = $1}
    | list
        {$$ = $1}
    ;

listContent
    : TOKEN arguments
        {$$ = [$1].concat($2)}
    | TOKEN
        {$$ = [$1]}
    ;

list
    : LIST_START listContent LIST_END
        {$$ = $2}
    ;
